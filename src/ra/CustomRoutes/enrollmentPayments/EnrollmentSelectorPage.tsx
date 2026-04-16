import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { EnrollmentSelector } from "../../resources/economicManagement/enrollmentPayments/EnrollmentSelector";

export const EnrollmentSelectorPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const studentId = Number(id);

    if (!id || isNaN(studentId)) {
        return <Typography color="error">Estudiante no válido.</Typography>;
    }

    return (
        <Box p={3}>
            <EnrollmentSelector
                studentId={studentId}
                onSelect={(enrollmentId) => navigate(`/enrollment-payments/${studentId}/${enrollmentId}`)}
            />
        </Box>
    );
};
