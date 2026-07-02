import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useMemo, useState } from "react";
import {
  Datagrid,
  Form,
  FunctionField,
  ListBase,
  TextField,
  Title,
  useDataProvider,
  useListContext,
  useNotify,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import type { AppDataProvider } from "@/app/dataProvider";
import AcademicFormSelector from "@/features/students/components/AcademicFormSelector";
import {
  loadReportFilters,
  ReportFiltersPersistence,
} from "@/shared/hooks/useReportFilters";
import { downloadBlob, openBlobInTab } from "@/shared/utils/blobFile";
import { formatAcademic, formatDate, type WithdrawnStudent } from "./format";

const REPORT_KEY = "withdrawn-students";
const PDF_FILENAME = "Estudiantes-Retirados.pdf";
const XLSX_FILENAME = "Estudiantes-Retirados.xlsx";

// Inner component — must live inside <Form> to access the form context.
// Requests the backend-generated file (PDF/Excel) for opening or downloading.
const GenerateActions = () => {
  const dataProvider = useDataProvider<AppDataProvider>();
  const notify = useNotify();
  const { handleSubmit } = useFormContext();
  const [busy, setBusy] = useState<"open" | "download" | "excel" | null>(null);

  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  const buildFilter = () => {
    const filter: Record<string, unknown> = {};
    if (schoolYearId != null) filter.schoolYearId = schoolYearId;
    if (levelId != null) filter.levelId = levelId;
    if (gradeId != null) filter.gradeId = gradeId;
    if (shiftId != null) filter.shiftId = shiftId;
    if (sectionId != null) filter.sectionId = sectionId;
    return filter;
  };

  // Open the tab synchronously (inside the click gesture) so the popup
  // blocker doesn't kill it after the async file fetch.
  const openInNewTab = () => {
    const win = window.open("", "_blank");
    handleSubmit(async () => {
      setBusy("open");
      try {
        const { data: blob } = await dataProvider.exportReport({
          report: "withdrawn",
          format: "pdf",
          filter: buildFilter(),
        });
        if (!blob) {
          win?.close();
          notify("Sin resultados para estos filtros", { type: "warning" });
          return;
        }
        openBlobInTab(win, blob);
      } catch (err) {
        win?.close();
        notify("No se pudo generar el reporte", { type: "error" });
        throw err;
      } finally {
        setBusy(null);
      }
    })();
  };

  const download = (format: "pdf" | "xlsx") =>
    handleSubmit(async () => {
      setBusy(format === "pdf" ? "download" : "excel");
      try {
        const { data: blob } = await dataProvider.exportReport({
          report: "withdrawn",
          format,
          filter: buildFilter(),
        });
        if (!blob) {
          notify("Sin resultados para estos filtros", { type: "warning" });
          return;
        }
        downloadBlob(blob, format === "pdf" ? PDF_FILENAME : XLSX_FILENAME);
      } catch (err) {
        notify("No se pudo generar el reporte", { type: "error" });
        throw err;
      } finally {
        setBusy(null);
      }
    })();

  return (
    <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
      <Button
        variant="contained"
        startIcon={
          busy === "open" ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <PictureAsPdfIcon />
          )
        }
        onClick={openInNewTab}
        disabled={busy !== null}
      >
        Generar Reporte
      </Button>
      <Button
        variant="outlined"
        startIcon={
          busy === "download" ? (
            <CircularProgress size={18} />
          ) : (
            <DownloadIcon />
          )
        }
        onClick={() => download("pdf")}
        disabled={busy !== null}
      >
        Descargar PDF
      </Button>
      <Button
        variant="outlined"
        startIcon={
          busy === "excel" ? <CircularProgress size={18} /> : <GridOnIcon />
        }
        onClick={() => download("xlsx")}
        disabled={busy !== null}
      >
        Descargar Excel
      </Button>
    </Box>
  );
};

const WithdrawnStudentsTable = () => {
  const { isPending, error, total } = useListContext<WithdrawnStudent>();

  if (isPending) return <LinearProgress sx={{ mt: 3 }} />;
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        No se pudo cargar el reporte de estudiantes retirados.
      </Alert>
    );
  }
  if (!total) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Sin resultados para estos filtros
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Datagrid bulkActionButtons={false} rowClick={false}>
        <TextField source="enrollmentCode" label="Código de Matrícula" />
        <TextField source="fullName" label="Nombre Completo" />
        <FunctionField
          label="Nivel Académico"
          render={(record: WithdrawnStudent) => formatAcademic(record)}
        />
        <FunctionField
          label="Fecha de Matrícula"
          render={(record: WithdrawnStudent) =>
            formatDate(record.enrollmentDate)
          }
        />
        <FunctionField
          label="Fecha de Retiro"
          render={(record: WithdrawnStudent) =>
            formatDate(record.withdrawalDate)
          }
        />
      </Datagrid>
    </Box>
  );
};

const WithdrawnStudentsContent = () => {
  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  // Only send set values — mirrors the other student reports' cascade.
  const filter = {
    ...(schoolYearId && { schoolYearId }),
    ...(levelId && { levelId }),
    ...(gradeId && { gradeId }),
    ...(shiftId && { shiftId }),
    ...(sectionId && { sectionId }),
  };

  return (
    <>
      <ReportFiltersPersistence reportKey={REPORT_KEY} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mt: 1,
          "& .MuiFormControl-root": { flex: "1 1 160px", mt: 0, mb: 0 },
        }}
      >
        <AcademicFormSelector required={false} requireYear defaultCurrentYear />
      </Box>
      <Box sx={{ mt: 3 }}>
        <GenerateActions />
      </Box>
      <ListBase
        resource="students-withdrawn-report"
        filter={filter}
        sort={{ field: "fullName", order: "ASC" }}
        disableSyncWithLocation
        perPage={1000}
      >
        <WithdrawnStudentsTable />
      </ListBase>
    </>
  );
};

export const WithdrawnStudentsPage = () => {
  // Seed the form once per mount; restored values survive RA's initial reset.
  const defaultValues = useMemo(() => loadReportFilters(REPORT_KEY), []);

  return (
    <>
      <Title title="Reporte: Estudiantes Retirados" />
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Form defaultValues={defaultValues}>
            <WithdrawnStudentsContent />
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
