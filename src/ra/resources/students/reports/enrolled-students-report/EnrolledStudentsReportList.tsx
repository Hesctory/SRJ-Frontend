import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { Title, useDataProvider, useGetList } from "react-admin";
import { EnrolledStudentsReport } from "../../../../../presentation/components/EnrolledStudentsReport";

export const EnrolledStudentsReportList = () => {
  const dataProvider = useDataProvider();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [pdfOpen, setPdfOpen] = useState(false);
  const [reportStudents, setReportStudents] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  const { data: schoolYears = [] } = useGetList("school-years", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "schoolYear", order: "DESC" },
  });

  const { data: levels = [] } = useGetList("levels", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "level", order: "ASC" },
  });

  const { data: grades = [] } = useGetList(
    "grades",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "grade", order: "ASC" },
      filter: { levelId: selectedLevel },
    },
    { enabled: !!selectedLevel },
  );

  const { data: gradeOfferings = [] } = useGetList(
    "grade-offerings",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
      filter: { gradeId: selectedGrade },
    },
    { enabled: !!selectedGrade },
  );

  const sections = [
    ...new Set(gradeOfferings.flatMap((go: any) => go.sections as string[])),
  ].sort();

  const handleLevel = (e: SelectChangeEvent) => {
    setSelectedLevel(e.target.value);
    setSelectedGrade("");
    setSelectedSection("");
  };

  const handleGrade = (e: SelectChangeEvent) => {
    setSelectedGrade(e.target.value);
    setSelectedSection("");
  };

  const handleGenerate = async () => {
    setGenerating(true);

    const filter: Record<string, any> = {};
    if (selectedYear) filter.schoolyearId = Number(selectedYear);
    if (selectedLevel) {
      const match = levels.find((l: any) => String(l.id) === selectedLevel);
      if (match) filter.level = (match as any).level;
    }
    if (selectedGrade) {
      const match = grades.find((g: any) => String(g.id) === selectedGrade);
      if (match) filter.grade = (match as any).grade;
    }
    if (selectedSection) filter.section = selectedSection;

    const { data } = await dataProvider.getList("students", {
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "fullName", order: "ASC" },
      filter,
    });

    setReportStudents(data);
    setGenerating(false);
    setPdfOpen(true);
  };

  const selectedSchoolYear =
    (schoolYears.find((sy: any) => String(sy.id) === selectedYear) as any)
      ?.schoolYear ?? "Todos";

  return (
    <>
      <Title title="Reporte: Estudiantes Matriculados" />
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
            {/* Año Escolar */}
            <FormControl sx={{ minWidth: 160 }} size="small">
              <InputLabel>Año Escolar</InputLabel>
              <Select
                value={selectedYear}
                label="Año Escolar"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {schoolYears.map((sy: any) => (
                  <MenuItem key={sy.id} value={String(sy.id)}>
                    {sy.schoolYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Nivel */}
            <FormControl sx={{ minWidth: 160 }} size="small">
              <InputLabel>Nivel</InputLabel>
              <Select
                value={selectedLevel}
                label="Nivel"
                onChange={handleLevel}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {levels.map((lv: any) => (
                  <MenuItem key={lv.id} value={String(lv.id)}>
                    {lv.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Grado */}
            <FormControl
              sx={{ minWidth: 160 }}
              size="small"
              disabled={!selectedLevel}
            >
              <InputLabel>Grado</InputLabel>
              <Select
                value={selectedGrade}
                label="Grado"
                onChange={handleGrade}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {grades.map((g: any) => (
                  <MenuItem key={g.id} value={String(g.id)}>
                    {g.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sección */}
            <FormControl
              sx={{ minWidth: 140 }}
              size="small"
              disabled={!selectedGrade}
            >
              <InputLabel>Sección</InputLabel>
              <Select
                value={selectedSection}
                label="Sección"
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {sections.map((sec) => (
                  <MenuItem key={sec} value={sec}>
                    {sec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={
                generating ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <PictureAsPdfIcon />
                )
              }
              onClick={handleGenerate}
              disabled={generating}
            >
              Generar Reporte
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* PDF Dialog */}
      <Dialog
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Reporte de Estudiantes Matriculados
          <IconButton onClick={() => setPdfOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: "80vh" }}>
          <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
            <EnrolledStudentsReport
              students={reportStudents}
              schoolYear={selectedSchoolYear}
            />
          </PDFViewer>
        </DialogContent>
      </Dialog>
    </>
  );
};
