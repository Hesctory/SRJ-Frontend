import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useGetList, useGetOne } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";
import { EnrollmentSummary } from "../../../../types/enrollment";

const STATE_COLOR: Record<string, "success" | "error" | "warning" | "default"> =
  {
    Activa: "success",
    Cancelada: "error",
    Retirada: "warning",
  };

export const EnrollmentSelectionPage = () => {
  const { studentId: studentIdParam } = useParams<{ studentId: string }>();
  const studentId = studentIdParam ? Number(studentIdParam) : undefined;
  const navigate = useNavigate();

  const { data: student, isLoading: loadingStudent } = useGetOne(
    "students",
    { id: studentId! },
    { enabled: !!studentId },
  );

  const { data: enrollments, isLoading: loadingEnrollments } =
    useGetList<EnrollmentSummary>("enrollments", {
      filter: { studentId },
      sort: { field: "year", order: "DESC" },
      pagination: { page: 1, perPage: 100 },
    });

  if (loadingStudent || loadingEnrollments) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/enrollment-payments")}
        sx={{ mb: 2 }}
      >
        Volver
      </Button>

      <Typography variant="h6" gutterBottom>
        {student?.fullName}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        DNI: {student?.idDocumentNumber}
      </Typography>

      {!enrollments || enrollments.length === 0 ? (
        <Typography color="text.secondary">
          Este estudiante no tiene matrículas registradas.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {enrollments.map((enrollment) => (
            <Grid item xs={12} sm={6} md={4} key={String(enrollment.id)}>
              <Card variant="outlined">
                <CardActionArea
                  onClick={() =>
                    navigate(
                      `/enrollment-payments/${studentId}/${enrollment.id}/debts`,
                    )
                  }
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {enrollment.year}
                      </Typography>
                      <Chip
                        label={enrollment.state}
                        color={STATE_COLOR[enrollment.state] ?? "default"}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2">{enrollment.level}</Typography>
                    <Typography variant="body2">
                      {enrollment.grade} — {enrollment.shift} —{" "}
                      {enrollment.section}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
