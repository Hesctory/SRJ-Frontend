import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PDFViewer } from "@react-pdf/renderer";
import { useMemo, useState } from "react";
import { Form, Title, useDataProvider } from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import AcademicFormSelector from "../../../../../presentation/components/AcademicFormSelector";
import { useAcademicFilterData } from "../../../../../presentation/hooks/useAcademicFilterData";
import { EnrolledStudentsDocument, type EnrolledStudent, type EnrolledReportContext } from "./EnrolledStudentsDocument";

// Inner component — must live inside <Form> to access the form context.
// Reads current field values via useWatch, fetches labels for the PDF header,
// and calls onResult with the report data when generation completes.
interface GenerateButtonProps {
    onResult: (students: EnrolledStudent[], context: EnrolledReportContext) => void;
}

const GenerateButton = ({ onResult }: GenerateButtonProps) => {
    const dataProvider = useDataProvider();
    const [generating, setGenerating] = useState(false);
    const { handleSubmit } = useFormContext();

    const schoolYearId = useWatch({ name: "schoolYearId" });
    const levelId      = useWatch({ name: "levelId" });
    const gradeId      = useWatch({ name: "gradeId" });
    const shiftId      = useWatch({ name: "shiftId" });
    const sectionId    = useWatch({ name: "sectionId" });

    // Cache-friendly label lookup — ReferenceInput inside AcademicFormSelector
    // already populates react-query's cache with these lists.
    const { schoolYears, levels, grades, shifts, sections } = useAcademicFilterData(
        schoolYearId, levelId, gradeId, shiftId
    );

    const generate = handleSubmit(async () => {
        setGenerating(true);
        try {
            const filter: Record<string, unknown> = {};
            if (schoolYearId != null) filter.schoolyearId = schoolYearId;
            if (levelId != null)      filter.levelId      = levelId;
            if (gradeId != null)      filter.gradeId      = gradeId;
            if (shiftId != null)      filter.shiftId      = shiftId;
            if (sectionId != null)    filter.sectionId    = sectionId;

            const { data } = await dataProvider.getList("students-enrolled-report", {
                pagination: { page: 1, perPage: 1000 },
                sort: { field: "fullName", order: "ASC" },
                filter,
            });

            onResult(data as EnrolledStudent[], {
                // eslint-disable-next-line eqeqeq
                schoolYear: schoolYears.find((sy) => sy.id == schoolYearId)?.year,
                // eslint-disable-next-line eqeqeq
                level:      levels.find((lv)  => lv.id  == levelId)?.name,
                // eslint-disable-next-line eqeqeq
                grade:      grades.find((g)   => g.id   == gradeId)?.name,
                // eslint-disable-next-line eqeqeq
                shift:      shifts.find((sh)  => sh.id  == shiftId)?.name,
                // eslint-disable-next-line eqeqeq
                section:    sections.find((s) => s.id   == sectionId)?.section,
            });
        } finally {
            setGenerating(false);
        }
    });

    return (
        <Button
            variant="contained"
            startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <PictureAsPdfIcon />}
            onClick={() => generate()}
            disabled={generating}
        >
            Generar Reporte
        </Button>
    );
};

// Outer component — owns only the PDF dialog state.
export const EnrolledStudentsPage = () => {
    const [students, setStudents] = useState<EnrolledStudent[]>([]);
    const [reportContext, setReportContext] = useState<EnrolledReportContext>({});
    const [pdfOpen, setPdfOpen] = useState(false);

    const handleResult = (data: EnrolledStudent[], ctx: EnrolledReportContext) => {
        setStudents(data);
        setReportContext(ctx);
        setPdfOpen(true);
    };

    const pdfDocument = useMemo(
        () => <EnrolledStudentsDocument students={students} context={reportContext} />,
        [students, reportContext]
    );

    return (
        <>
            <Title title="Reporte: Estudiantes Matriculados" />
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Filtros</Typography>
                    <Form>
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            mt: 1,
                            // Override RA/MUI defaults: make inputs compact and horizontal
                            "& .MuiFormControl-root": {
                                flex: "1 1 160px",
                                mt: 0,
                                mb: 0,
                            },
                        }}>
                            <AcademicFormSelector required={false} />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <GenerateButton onResult={handleResult} />
                        </Box>
                    </Form>
                </CardContent>
            </Card>

            <Dialog open={pdfOpen} onClose={() => setPdfOpen(false)} maxWidth="xl" fullWidth>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Reporte de Estudiantes Matriculados
                    <IconButton onClick={() => setPdfOpen(false)}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0, height: "80vh" }}>
                    <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
                        {pdfDocument}
                    </PDFViewer>
                </DialogContent>
            </Dialog>
        </>
    );
};
