import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PaymentPlan } from "../../types/payment";

interface PaymentPlanModalProps {
  open: boolean;
  plan: PaymentPlan | null;
  onCancel: () => void;
  onConfirm: () => void;
  isConfirming: boolean;
}

const PaymentPlanModal = ({
  open,
  plan,
  onCancel,
  onConfirm,
  isConfirming,
}: PaymentPlanModalProps) => {
  if (!plan) return null;

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Plan de pago</DialogTitle>
      <DialogContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Concepto</TableCell>
              <TableCell align="right">Asignado</TableCell>
              <TableCell align="right">Pendiente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plan.lines.map((line) => (
              <TableRow key={String(line.debtId)}>
                <TableCell>{line.description}</TableCell>
                <TableCell align="right">
                  S/ {line.allocated.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  S/ {line.remaining.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider sx={{ my: 1.5 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" fontWeight={600}>
            Total asignado
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            S/ {plan.totalAllocated.toFixed(2)}
          </Typography>
        </Box>
        {plan.change > 0 && (
          <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography variant="body2" color="text.secondary">
              Vuelto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              S/ {plan.change.toFixed(2)}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isConfirming}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isConfirming}
          startIcon={isConfirming ? <CircularProgress size={16} /> : null}
        >
          Confirmar pago
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentPlanModal;
