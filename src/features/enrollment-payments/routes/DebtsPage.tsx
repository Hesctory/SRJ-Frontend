import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetList, useGetOne } from "react-admin";
import { useNavigate, useParams } from "react-router-dom";
import PaymentDrawer from "@/features/enrollment-payments/components/PaymentDrawer";
import usePaymentDrawer from "@/features/enrollment-payments/hooks/usePaymentDrawer";
import { DebtStatus, EnrollmentDebt } from "@/types/payment";

const STATUS_LABEL: Record<DebtStatus, string> = {
  PENDING: "Pendiente",
  PARTIALLY_PAID: "Pago parcial",
  OVERDUE: "Vencido",
  PAID: "Pagado",
  CANCELLED: "Anulado",
};

const STATUS_COLOR: Record<
  DebtStatus,
  "default" | "success" | "error" | "warning" | "info"
> = {
  PENDING: "warning",
  PARTIALLY_PAID: "info",
  OVERDUE: "error",
  PAID: "success",
  CANCELLED: "default",
};

const isActionable = (status: DebtStatus) =>
  status === "PENDING" || status === "PARTIALLY_PAID" || status === "OVERDUE";

export const DebtsPage = () => {
  const { studentId: studentIdParam, enrollmentId: enrollmentIdParam } =
    useParams<{
      studentId: string;
      enrollmentId: string;
    }>();
  const studentId = studentIdParam ? Number(studentIdParam) : undefined;
  const enrollmentId = enrollmentIdParam
    ? Number(enrollmentIdParam)
    : undefined;
  const navigate = useNavigate();

  const { drawerState, openPay, openDetails, openQuickPay, closeDrawer } =
    usePaymentDrawer();

  const { data: student, isLoading: loadingStudent } = useGetOne(
    "students",
    { id: studentId! },
    { enabled: !!studentId },
  );

  const { data: enrollment, isLoading: loadingEnrollment } = useGetOne(
    "enrollments",
    { id: enrollmentId! },
    { enabled: !!enrollmentId },
  );

  const { data: debts, isLoading: loadingDebts } = useGetList<EnrollmentDebt>(
    "enrollment-debts",
    {
      filter: { enrollmentId },
      sort: { field: "dueDate", order: "ASC" },
      pagination: { page: 1, perPage: 100 },
    },
  );

  if (loadingStudent || loadingEnrollment || loadingDebts) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box p={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate(`/enrollment-payments/${studentId}/enrollments`)
          }
          sx={{ mb: 2 }}
        >
          Volver
        </Button>

        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Box>
            <Typography variant="h6">{student?.fullName}</Typography>
            <Typography variant="body2" color="text.secondary">
              DNI: {student?.dni}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {enrollment?.year} — {enrollment?.level} {enrollment?.grade} —{" "}
              {enrollment?.shift} {enrollment?.section}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={openQuickPay}>
            Pago rápido
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Debts list */}
        {!debts || debts.length === 0 ? (
          <Typography color="text.secondary">
            No hay deudas registradas para esta matrícula.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {debts.map((debt) => (
              <Paper key={String(debt.id)} variant="outlined" sx={{ p: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Box>
                    <Typography variant="subtitle2">
                      {debt.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vence: {debt.dueDate}
                    </Typography>
                    <Typography variant="body2">
                      Total: S/ {debt.totalAmount.toFixed(2)} — Pagado: S/{" "}
                      {debt.paidAmount.toFixed(2)}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={STATUS_LABEL[debt.status]}
                      color={STATUS_COLOR[debt.status]}
                      size="small"
                    />

                    {isActionable(debt.status) ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => openPay(debt.id)}
                      >
                        Pagar
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<SendIcon fontSize="small" />}
                          disabled
                        >
                          Enviar
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => openDetails(debt.id)}
                        >
                          Detalles
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <PaymentDrawer
        drawerState={drawerState}
        enrollmentId={enrollmentId!}
        onClose={closeDrawer}
        onPaymentConfirmed={closeDrawer}
      />
    </>
  );
};
