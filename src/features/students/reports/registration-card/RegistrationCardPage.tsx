import DownloadIcon from "@mui/icons-material/Download";
import GridOnIcon from "@mui/icons-material/GridOn";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Datagrid,
  Form,
  ListBase,
  TextField,
  TextInput,
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

const PDF_FILENAME = "Ficha-Matricula.pdf";
const XLSX_FILENAME = "Ficha-Matricula.xlsx";
const REPORT_KEY = "registration-card";

const GenerateActions = () => {
  const dataProvider = useDataProvider<AppDataProvider>();
  const notify = useNotify();
  const { handleSubmit } = useFormContext();
  const { selectedIds, total, isPending } = useListContext();
  const [busy, setBusy] = useState<"open" | "download" | "excel" | null>(null);

  // No matching students (and none hand-picked) → nothing to generate.
  const noResults = !isPending && total === 0 && selectedIds.length === 0;

  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  const buildFilter = () => {
    const filter: Record<string, string> = {};
    if (schoolYearId) filter.schoolYearId = String(schoolYearId);
    if (levelId) filter.levelId = String(levelId);
    if (gradeId) filter.gradeId = String(gradeId);
    if (shiftId) filter.shiftId = String(shiftId);
    if (sectionId) filter.sectionId = String(sectionId);
    if (selectedIds.length > 0) filter.studentIds = selectedIds.join(",");
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
          report: "registrationCard",
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
        notify("No se pudo generar la ficha", { type: "error" });
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
          report: "registrationCard",
          format,
          filter: buildFilter(),
        });
        if (!blob) {
          notify("Sin resultados para estos filtros", { type: "warning" });
          return;
        }
        downloadBlob(blob, format === "pdf" ? PDF_FILENAME : XLSX_FILENAME);
      } catch (err) {
        notify("No se pudo generar la ficha", { type: "error" });
        throw err;
      } finally {
        setBusy(null);
      }
    })();

  return (
    <Box
      sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}
    >
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
        disabled={busy !== null || noResults}
      >
        Generar Ficha
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
        disabled={busy !== null || noResults}
      >
        Descargar PDF
      </Button>
      <Button
        variant="outlined"
        startIcon={
          busy === "excel" ? <CircularProgress size={18} /> : <GridOnIcon />
        }
        onClick={() => download("xlsx")}
        disabled={busy !== null || noResults}
      >
        Descargar Excel
      </Button>
      {noResults && (
        <Typography variant="body2" color="text.secondary">
          Sin resultados para estos filtros
        </Typography>
      )}
    </Box>
  );
};

const SelectionResetter = ({ filterKey }: { filterKey: string }) => {
  const { onUnselectItems } = useListContext();
  const unselectRef = useRef(onUnselectItems);
  unselectRef.current = onUnselectItems;

  useEffect(() => {
    unselectRef.current();
  }, [filterKey]);
  return null;
};

const StudentSelectionList = ({ filterKey }: { filterKey: string }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle1" gutterBottom>
      Seleccionar estudiantes{" "}
      <Typography component="span" variant="body2" color="text.secondary">
        (sin selección = todos)
      </Typography>
    </Typography>
    <SelectionResetter filterKey={filterKey} />
    <Datagrid bulkActionButtons={<></>} rowClick="toggleSelection">
      <TextField source="dni" label="DNI" />
      <TextField source="fullName" label="Nombre Completo" />
    </Datagrid>
    <Box sx={{ mt: 2 }}>
      <GenerateActions />
    </Box>
  </Box>
);

const RegistrationCardForm = () => {
  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });
  const dni = useWatch({ name: "dni" });
  const fullName = useWatch({ name: "fullName" });

  const filter = {
    ...(schoolYearId && { schoolYearId }),
    ...(levelId && { levelId }),
    ...(gradeId && { gradeId }),
    ...(shiftId && { shiftId }),
    ...(sectionId && { sectionId }),
    ...(dni && { dni }),
    ...(fullName && { fullName }),
  };

  const filterKey = [
    schoolYearId,
    levelId,
    gradeId,
    shiftId,
    sectionId,
    dni,
    fullName,
  ]
    .filter(Boolean)
    .join("|");

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mt: 2,
          "& .MuiFormControl-root": { flex: "1 1 160px", mt: 0, mb: 0 },
        }}
      >
        <TextInput source="dni" label="DNI" />
        <TextInput source="fullName" label="Nombre" />
      </Box>
      <ListBase
        resource="students"
        filter={filter}
        disableSyncWithLocation
        perPage={200}
      >
        <StudentSelectionList filterKey={filterKey} />
      </ListBase>
    </>
  );
};

export const RegistrationCardPage = () => {
  // Seed the form once per mount; restored values survive RA's initial reset.
  const defaultValues = useMemo(() => loadReportFilters(REPORT_KEY), []);

  return (
    <>
      <Title title="Reporte: Ficha de Matrícula" />
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ficha de Matrícula
          </Typography>
          <Form defaultValues={defaultValues}>
            <RegistrationCardForm />
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
