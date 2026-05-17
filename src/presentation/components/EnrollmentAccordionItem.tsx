import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    CircularProgress,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form, Identifier } from "react-admin";
import EnrollmentFormInputs from "./EnrollmentFormInputs";
import { useEnrollmentDetail } from "../hooks/useEnrollmentDetail";
import { EnrollmentSummary } from "../../types/enrollment";

interface EnrollmentAccordionItemProps {
    enrollment: EnrollmentSummary;
    expanded: boolean;
    onExpandChange: (id: Identifier, expanding: boolean) => void;
    onSave: (id: Identifier, data: Record<string, unknown>, previousData: Record<string, unknown>) => Promise<void>;
    onDelete: (id: Identifier) => Promise<void>;
}

export const EnrollmentAccordionItem = ({
    enrollment,
    expanded,
    onExpandChange,
    onSave,
    onDelete,
}: EnrollmentAccordionItemProps) => {
    const [pendingDelete, setPendingDelete] = useState(false);
    const { detail, isLoading, fetchDetail, updateDetail } = useEnrollmentDetail(enrollment.id);

    useEffect(() => {
        if (expanded) fetchDetail();
    }, [expanded]);

    const handleSave = async (data: Record<string, unknown>) => {
        await onSave(enrollment.id, data, detail!);
        updateDetail(data);
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={(_, isExpanding) => onExpandChange(enrollment.id, isExpanding)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Chip label={enrollment.year} color="primary" size="small" />
                    <Typography>
                        {enrollment.grade} {enrollment.section}, {enrollment.level} {enrollment.shift}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" py={2}>
                        <CircularProgress size={24} />
                    </Box>
                ) : detail ? (
                    <Form defaultValues={detail} onSubmit={handleSave}>
                        <EnrollmentFormInputs />
                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} mt={2}>
                            {pendingDelete ? (
                                <>
                                    <Typography variant="body2" color="error">
                                        ¿Confirmar eliminación?
                                    </Typography>
                                    <Button size="small" onClick={() => setPendingDelete(false)}>
                                        No
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="error"
                                        onClick={() => onDelete(enrollment.id)}
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
                                        onClick={() => setPendingDelete(true)}
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
                ) : null}
            </AccordionDetails>
        </Accordion>
    );
};
