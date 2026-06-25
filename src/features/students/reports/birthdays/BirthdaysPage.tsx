import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { Form, Title, useDataProvider } from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import AcademicFormSelector from "@/features/students/components/AcademicFormSelector";
import { useAcademicFilterData } from "@/shared/hooks/useAcademicFilterData";
import { BirthdaysDocument, type BirthdayStudent } from "./BirthdaysDocument";

const PDF_FILENAME = "Cumpleanos-Estudiantes.pdf";

/** Sort key: month*100 + day, so the list reads as a calendar of birthdays
 *  regardless of birth year. Unparseable dates sink to the bottom. */
const dayMonthKey = (s: BirthdayStudent): number => {
  const iso = s.birthDate?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return Number(iso[2]) * 100 + Number(iso[3]);
  const d = new Date(s.birthDate);
  return Number.isNaN(d.getTime())
    ? 9999
    : (d.getMonth() + 1) * 100 + d.getDate();
};

// Inner component — must live inside <Form> to access the form context.
const GenerateActions = () => {
  const dataProvider = useDataProvider();
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

    const { data } = await dataProvider.getList("students-birthdays-report", {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "fullName", order: "ASC" },
      filter,
    });

    const students = [...(data as BirthdayStudent[])].sort(
      (a, b) =>
        dayMonthKey(a) - dayMonthKey(b) || a.fullName.localeCompare(b.fullName),
    );

    const doc = (
      <BirthdaysDocument
        students={students}
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

export const BirthdaysPage = () => (
  <>
    <Title title="Reporte: Cumpleaños" />
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>
        <Form>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              mt: 1,
              "& .MuiFormControl-root": { flex: "1 1 160px", mt: 0, mb: 0 },
            }}
          >
            <AcademicFormSelector
              required={false}
              requireYear
              defaultCurrentYear
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <GenerateActions />
          </Box>
        </Form>
      </CardContent>
    </Card>
  </>
);
