import { useState } from "react";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import {
  Datagrid,
  ListBase,
  Pagination,
  TextField as RaTextField,
  useListFilterContext,
} from "react-admin";

export type PersonKind = "student" | "staff";

export interface PersonSearchResult {
  id: number;
  fullName: string;
  kind: PersonKind;
}

interface PersonSearchProps {
  /** Called when a row is clicked. Navigation is suppressed by the caller's intent. */
  onSelect: (person: PersonSearchResult) => void;
  /** Currently selected person id, to highlight the active row. */
  selectedId?: number | null;
}

const StudentFilters = () => {
  const { filterValues, setFilters, displayedFilters } = useListFilterContext();
  return (
    <Box display="flex" gap={1} mb={1} sx={{ flexShrink: 0 }}>
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
        sx={{ minWidth: 130 }}
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
        sx={{ flex: 1, minWidth: 160 }}
      />
    </Box>
  );
};

const StaffFilters = () => {
  const { filterValues, setFilters, displayedFilters } = useListFilterContext();
  return (
    <Box display="flex" gap={1} mb={1} sx={{ flexShrink: 0 }}>
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
        sx={{ flex: 1, minWidth: 200 }}
      />
    </Box>
  );
};

/** Wraps a RA Datagrid so only the row list scrolls, not the whole page. */
const scrollableList = {
  flex: 1,
  minHeight: 0,
  overflowY: "auto" as const,
  "& .RaDatagrid-row": { cursor: "pointer" },
};

export const PersonSearch = ({ onSelect, selectedId }: PersonSearchProps) => {
  const [tab, setTab] = useState(0);
  const kind: PersonKind = tab === 0 ? "student" : "staff";

  const handleRowClick = (
    id: string | number,
    record: Record<string, unknown>,
  ) => {
    onSelect({
      id: Number(id),
      fullName: record.fullName as string,
      kind,
    });
    return false as const;
  };

  const rowSx = (record: Record<string, unknown>) =>
    selectedId != null && Number(record.id) === selectedId
      ? { bgcolor: "action.selected" }
      : {};

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ height: "100%", minHeight: 0 }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 1, minHeight: 36, flexShrink: 0 }}
      >
        <Tab label="Estudiantes" sx={{ minHeight: 36, py: 0.5 }} />
        <Tab label="Personal" sx={{ minHeight: 36, py: 0.5 }} />
      </Tabs>

      {tab === 0 ? (
        <ListBase resource="students" perPage={10} debounce={500}>
          <StudentFilters />
          <Box sx={scrollableList}>
            <Datagrid
              rowClick={handleRowClick}
              rowSx={rowSx}
              bulkActionButtons={false}
            >
              <RaTextField source="fullName" label="Nombre" />
              <RaTextField source="dni" label="DNI" />
            </Datagrid>
          </Box>
          <Pagination rowsPerPageOptions={[]} />
        </ListBase>
      ) : (
        <ListBase resource="staff-members" perPage={10} debounce={500}>
          <StaffFilters />
          <Box sx={scrollableList}>
            <Datagrid
              rowClick={handleRowClick}
              rowSx={rowSx}
              bulkActionButtons={false}
            >
              <RaTextField source="fullName" label="Nombre" />
              <RaTextField source="documentNumber" label="Documento" />
            </Datagrid>
          </Box>
          <Pagination rowsPerPageOptions={[]} />
        </ListBase>
      )}
    </Box>
  );
};

export default PersonSearch;
