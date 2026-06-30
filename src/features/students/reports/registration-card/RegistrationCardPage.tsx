import DownloadIcon from "@mui/icons-material/Download";
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
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import AcademicFormSelector from "@/features/students/components/AcademicFormSelector";
import {
  loadReportFilters,
  ReportFiltersPersistence,
} from "@/shared/hooks/useReportFilters";
import {
  RegistrationCardDocument,
  type RegistrationCardStudent,
} from "./RegistrationCardDocument";

const PDF_FILENAME = "Ficha-Matricula.pdf";
const REPORT_KEY = "registration-card";

const GenerateActions = () => {
  const dataProvider = useDataProvider();
  const { handleSubmit } = useFormContext();
  const { selectedIds } = useListContext();
  const [busy, setBusy] = useState<"open" | "download" | null>(null);

  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  const buildBlob = async () => {
    const filter: Record<string, string> = {};
    if (schoolYearId) filter.schoolYearId = String(schoolYearId);
    if (levelId) filter.levelId = String(levelId);
    if (gradeId) filter.gradeId = String(gradeId);
    if (shiftId) filter.shiftId = String(shiftId);
    if (sectionId) filter.sectionId = String(sectionId);
    if (selectedIds.length > 0) filter.studentIds = selectedIds.join(",");

    const { data } = await dataProvider.getList(
      "students-registration-card-report",
      {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "fullName", order: "ASC" },
        filter,
      },
    );

    const doc = (
      <RegistrationCardDocument
        students={data as RegistrationCardStudent[]}
        context={{}}
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
        const url = URL.createObjectURL(await buildBlob());
        if (win) win.location.href = url;
        else window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } catch (err) {
        win?.close();
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
        const url = URL.createObjectURL(await buildBlob());
        const a = document.createElement("a");
        a.href = url;
        a.download = PDF_FILENAME;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1_000);
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
        onClick={download}
        disabled={busy !== null}
      >
        Descargar PDF
      </Button>
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
