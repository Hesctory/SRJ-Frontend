import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form } from "react-admin";
import EnrollmentFormInputs from "./EnrollmentFormInputs";

interface MockEnrollment {
    id: number;
    summaryLabel: string;
    defaultValues: Record<string, unknown>;
}

const MOCK_ENROLLMENTS: MockEnrollment[] = [
    {
        id: 1,
        summaryLabel: "2025 — Primaria · 3° A",
        defaultValues: {
            schoolYearId: 3,
            levelId: 1,
            gradeId: 3,
            shiftId: 1,
            sectionId: 1,
            schoolFeeConceptId: 1,
            previousSchool: "Colegio San José",
        },
    },
    {
        id: 2,
        summaryLabel: "2024 — Primaria · 2° B",
        defaultValues: {
            schoolYearId: 2,
            levelId: 1,
            gradeId: 2,
            shiftId: 1,
            sectionId: 2,
            schoolFeeConceptId: 1,
            previousSchool: "Colegio San José",
        },
    },
    {
        id: 3,
        summaryLabel: "2023 — Primaria · 1° A",
        defaultValues: {
            schoolYearId: 1,
            levelId: 1,
            gradeId: 1,
            shiftId: 1,
            sectionId: 1,
            schoolFeeConceptId: 2,
            previousSchool: "",
        },
    },
];

interface EnrollmentsDialogProps {
    open: boolean;
    onClose: () => void;
}

export const EnrollmentsDialog = ({ open, onClose }: EnrollmentsDialogProps) => {
    const [enrollments, setEnrollments] = useState<MockEnrollment[]>(MOCK_ENROLLMENTS);
    const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setEnrollments((prev) => prev.filter((e) => e.id !== id));
        setPendingDeleteId(null);
    };

    const handleSave = (id: number, data: Record<string, unknown>) => {
        console.log("Save enrollment", id, data);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Matrículas del Estudiante</DialogTitle>
            <DialogContent>
                <Box mt={1} display="flex" flexDirection="column" gap={1}>
                    {enrollments.length === 0 ? (
                        <Typography color="text.secondary">No hay matrículas registradas.</Typography>
                    ) : (
                        enrollments.map((enrollment) => (
                            <Accordion key={enrollment.id}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Chip label="Matrícula" color="primary" size="small" />
                                        <Typography>{enrollment.summaryLabel}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Form
                                        defaultValues={enrollment.defaultValues}
                                        onSubmit={(data: Record<string, unknown>) => handleSave(enrollment.id, data)}
                                    >
                                        <EnrollmentFormInputs />
                                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} mt={2}>
                                            {pendingDeleteId === enrollment.id ? (
                                                <>
                                                    <Typography variant="body2" color="error">
                                                        ¿Confirmar eliminación?
                                                    </Typography>
                                                    <Button size="small" onClick={() => setPendingDeleteId(null)}>
                                                        No
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDelete(enrollment.id)}
                                                    >
                                                        Sí
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="outlined"
                                                        onClick={() => setPendingDeleteId(enrollment.id)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                    <Button size="small" variant="contained" color="primary" type="submit">
                                                        Guardar cambios
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    </Form>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};
