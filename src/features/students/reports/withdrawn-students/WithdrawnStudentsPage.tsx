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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { pdf } from "@react-pdf/renderer";
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
import AcademicFormSelector from "@/features/students/components/AcademicFormSelector";
import { useAcademicFilterData } from "@/shared/hooks/useAcademicFilterData";
import {
  loadReportFilters,
  ReportFiltersPersistence,
} from "@/shared/hooks/useReportFilters";
import {
  formatAcademic,
  formatDate,
  WithdrawnStudentsDocument,
  type WithdrawnStudent,
} from "./WithdrawnStudentsDocument";

const REPORT_KEY = "withdrawn-students";
const PDF_FILENAME = "Estudiantes-Retirados.pdf";

// Inner component — must live inside <Form> to access the form context.
// Fetches the report rows, resolves filter labels for the PDF header, and
// generates the PDF blob for opening in a new tab or downloading.
const GenerateActions = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { handleSubmit } = useFormContext();
  const [busy, setBusy] = useState<"open" | "download" | null>(null);

  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  const { schoolYears, levels, grades, shifts, sections } =
    useAcademicFilterData(schoolYearId, levelId, gradeId, shiftId);

  const buildBlob = async () => {
    const filter: Record<string, unknown> = {};
    if (schoolYearId != null) filter.schoolYearId = schoolYearId;
    if (levelId != null) filter.levelId = levelId;
    if (gradeId != null) filter.gradeId = gradeId;
    if (shiftId != null) filter.shiftId = shiftId;
    if (sectionId != null) filter.sectionId = sectionId;

    const { data } = await dataProvider.getList("students-withdrawn-report", {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "fullName", order: "ASC" },
      filter,
    });

    // Don't produce a blank PDF — let the caller surface an empty-state notice.
    if (!data || data.length === 0) return null;

    const doc = (
      <WithdrawnStudentsDocument
        students={data as WithdrawnStudent[]}
        context={{
          schoolYear: schoolYears.find((sy) => sy.id == schoolYearId)?.year,
          level: levels.find((lv) => lv.id == levelId)?.name,
          grade: grades.find((g) => g.id == gradeId)?.name,
          shift: shifts.find((sh) => sh.id == shiftId)?.name,
          section: sections.find((s) => s.id == sectionId)?.section,
        }}
      />
    );
    return pdf(doc).toBlob();
  };

  // Open the tab synchronously (inside the click gesture) so the popup
  // blocker doesn't kill it after the async PDF generation.
  const openInNewTab = () => {
    const win = window.open("", "_blank");
    handleSubmit(async () => {
      setBusy("open");
      try {
        const blob = await buildBlob();
        if (!blob) {
          win?.close();
          notify("Sin resultados para estos filtros", { type: "warning" });
          return;
        }
        const url = URL.createObjectURL(blob);
        if (win) win.location.href = url;
        else window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (err) {
        win?.close();
        notify("No se pudo generar el reporte", { type: "error" });
        throw err;
      } finally {
        setBusy(null);
      }
    })();
  };

  const download = () =>
    handleSubmit(async () => {
      setBusy("download");
      try {
        const blob = await buildBlob();
        if (!blob) {
          notify("Sin resultados para estos filtros", { type: "warning" });
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = PDF_FILENAME;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1_000);
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
        onClick={download}
        disabled={busy !== null}
      >
        Descargar PDF
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
