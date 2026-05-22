import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Identifier, useGetList } from "react-admin";
import { DebtInstallment } from "../../types/payment";

interface InstallmentsSummaryProps {
  debtId: Identifier;
}

const InstallmentsSummary = ({ debtId }: InstallmentsSummaryProps) => {
  const { data, isLoading } = useGetList<DebtInstallment>("debt-installments", {
    filter: { debtId },
    pagination: { page: 1, perPage: 100 },
    sort: { field: "date", order: "ASC" },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
        Sin pagos registrados.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Resumen de cuotas
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Método</TableCell>
              <TableCell>Referencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((installment) => (
              <TableRow key={installment.id}>
                <TableCell>{installment.date}</TableCell>
                <TableCell align="right">
                  S/ {installment.amount.toFixed(2)}
                </TableCell>
                <TableCell>{installment.paymentMethodName}</TableCell>
                <TableCell>{installment.reference ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InstallmentsSummary;
