import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetList, useGetMany } from "react-admin";

interface Enrollment {
  id: number;
  studentId: number;
  yearId: number;
}

interface SchoolYear {
  id: number;
  schoolYear: string;
}

interface EnrollmentSelectorProps {
  studentId: number;
  onSelect: (enrollmentId: number) => void;
}

export const EnrollmentSelector = ({
  studentId,
  onSelect,
}: EnrollmentSelectorProps) => {
  const { data: enrollments, isPending: enrollmentsLoading } =
    useGetList<Enrollment>("enrollments", {
      filter: { studentId },
      pagination: { page: 1, perPage: 100 },
    });

  const yearIds = enrollments?.map((e) => e.yearId) ?? [];

  const { data: schoolYears, isPending: yearsLoading } = useGetMany<SchoolYear>(
    "school-years",
    { ids: yearIds },
    { enabled: yearIds.length > 0 },
  );

  const isLoading = enrollmentsLoading || yearsLoading;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <Typography color="text.secondary">
        Este estudiante no tiene matrículas registradas.
      </Typography>
    );
  }

  const schoolYearMap = new Map<number, string>(
    schoolYears?.map((sy) => [sy.id, sy.schoolYear]) ?? [],
  );

  const sorted = [...enrollments].sort((a, b) => {
    const ya = schoolYearMap.get(a.yearId) ?? "";
    const yb = schoolYearMap.get(b.yearId) ?? "";
    return yb.localeCompare(ya);
  });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Selecciona el año escolar</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {sorted.map((enrollment) => {
          const yearLabel =
            schoolYearMap.get(enrollment.yearId) ?? `Año ${enrollment.yearId}`;
          return (
            <Button
              key={enrollment.id}
              variant="outlined"
              size="large"
              onClick={() => onSelect(enrollment.id)}
              sx={{ minWidth: 120, fontSize: "1.25rem", fontWeight: "bold" }}
            >
              {yearLabel}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
