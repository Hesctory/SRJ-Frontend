import { Box, TextField } from "@mui/material";
import {
  Datagrid,
  ListBase,
  TextField as RaTextField,
  useListFilterContext,
} from "react-admin";
import AcademicFilterSelector from "@/shared/components/AcademicFilterSelector";

const StudentTextFilters = () => {
  const { filterValues, setFilters, displayedFilters } = useListFilterContext();

  return (
    <>
      <TextField
        size="small"
        label="DNI"
        value={filterValues.dni ?? ""}
        onChange={(e) =>
          setFilters(
            { ...filterValues, dni: e.target.value || undefined },
            displayedFilters,
          )
        }
        sx={{ minWidth: 140 }}
      />
      <TextField
        size="small"
        label="Nombre"
        value={filterValues.fullName ?? ""}
        onChange={(e) =>
          setFilters(
            { ...filterValues, fullName: e.target.value || undefined },
            displayedFilters,
          )
        }
        sx={{ minWidth: 200 }}
      />
    </>
  );
};

export const StudentSelectionPage = () => (
  <ListBase resource="students" debounce={500}>
    <Box p={3}>
      <Box display="flex" gap={1} mb={2}>
        <AcademicFilterSelector />
        <StudentTextFilters />
      </Box>

      <Datagrid
        rowClick={(id) => `/enrollment-payments/${id}/enrollments`}
        bulkActionButtons={false}
        sx={{
          "& .column-dni": { width: "15%" },
          "& .column-fullName": { width: "70%" },
          "& .column-studentCode": { width: "15%" },
        }}
      >
        <RaTextField source="dni" label="DNI" />
        <RaTextField source="fullName" label="Nombre Completo" />
        <RaTextField source="studentCode" label="Código" />
      </Datagrid>
    </Box>
  </ListBase>
);
