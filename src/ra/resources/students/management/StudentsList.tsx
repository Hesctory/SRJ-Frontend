import { useState } from "react";
import {
  Datagrid,
  List,
  TextField,
  Button,
  TopToolbar,
  useNotify,
  useRefresh,
  useDataProvider,
  useRecordContext,
} from "react-admin";
import ReplayIcon from "@mui/icons-material/Replay";
import AddIcon from "@mui/icons-material/Add";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EnrollmentDialog } from "../../../../presentation/components/EnrollmentDialog";
import { dataProvider as dpType, SchoolYear } from "../../../dataProvider";

const ListActions = () => {
  const navigate = useNavigate();
  return (
    <TopToolbar>
      <Button
        label="Nuevo Estudiante"
        onClick={() => navigate("/students/create")}
      >
        <AddIcon />
      </Button>
    </TopToolbar>
  );
};

const ReenrollButton = () => {
  const record = useRecordContext<{ id: number | string }>();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eligibleYears, setEligibleYears] = useState<SchoolYear[]>([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const dp = useDataProvider<typeof dpType>();

  if (!record) return null;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const years = await dp.getEligibleYears(record.id);
      if (years.length === 0) {
        notify("No hay años abiertos para rematrícula", { type: "warning" });
      } else {
        setEligibleYears(years);
        setDialogOpen(true);
      }
    } catch {
      notify("Error al verificar años disponibles", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        label="Rematricular"
        onClick={handleClick}
        disabled={loading}
        size="small"
        sx={{ color: "warning.main" }}
      >
        {loading ? <CircularProgress size={16} /> : <ReplayIcon />}
      </Button>

      {dialogOpen && (
        <EnrollmentDialog
          mode="reenroll"
          studentId={record.id}
          eligibleYears={eligibleYears}
          onClose={() => setDialogOpen(false)}
          onSuccess={refresh}
        />
      )}
    </>
  );
};

export const StudentsList = () => (
  <List actions={<ListActions />}>
    <Datagrid
      bulkActionButtons={false}
      sx={{
        "& .column-dni": { width: "15%" },
        "& .column-fullName": { width: "70%" },
      }}
    >
      <TextField source="dni" label="DNI" />
      <TextField source="fullName" label="Nombre Completo" />
      <ReenrollButton />
    </Datagrid>
  </List>
);
