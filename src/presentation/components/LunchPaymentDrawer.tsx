import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNotify, useRefresh } from "react-admin";
import { API_URL, httpClient } from "../../ra/dataProvider";
import {
  LunchDebtSummary,
  LunchPaymentResult,
} from "../../types/lunchAssignment";
import { todayLocal } from "../../utils/date";

const DRAWER_WIDTH = 480;

interface LunchPaymentDrawerProps {
  open: boolean;
  person: LunchDebtSummary | null;
  onClose: () => void;
}

const LunchPaymentDrawer = ({
  open,
  person,
  onClose,
}: LunchPaymentDrawerProps) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayLocal());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LunchPaymentResult | null>(null);

  const handleClose = () => {
    setAmount("");
    setDate(todayLocal());
    setResult(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!person || !amount || parseFloat(amount) <= 0) return;
    setSubmitting(true);
    try {
      const { json } = await httpClient(`${API_URL}/lunch-payments`, {
        method: "POST",
        body: JSON.stringify({
          personId: person.id,
          amount: parseFloat(amount),
          date,
        }),
      });
      setResult(json as LunchPaymentResult);
      notify("Pago registrado correctamente", { type: "success" });
      refresh();
    } catch (error: unknown) {
      const status = (error as { status?: number }).status;
      if (status === 400) {
        notify("Esta persona no tiene deudas pendientes de lonchera", {
          type: "warning",
        });
      } else {
        notify("Error al registrar el pago", { type: "error" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, p: 3 } }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Registrar Pago de Lonchera</Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {person && (
        <Typography variant="subtitle2" color="text.secondary" mb={2}>
          {person.personFullName} — Deuda total: S/{" "}
          {person.totalDebt.toFixed(2)}
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      {!result ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputProps={{ min: 0.01, step: "0.01" }}
            size="small"
            fullWidth
          />
          <TextField
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !amount || parseFloat(amount) <= 0}
            startIcon={
              submitting ? <CircularProgress size={16} color="inherit" /> : null
            }
          >
            {submitting ? "Registrando..." : "Pagar"}
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle2" mb={1}>
            Distribución del pago
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Lonchera</TableCell>
                <TableCell align="right">Aplicado</TableCell>
                <TableCell align="right">Restante</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.lines.map((line) => (
                <TableRow key={line.assignmentId}>
                  <TableCell>{line.assignedDate}</TableCell>
                  <TableCell>{line.lunchName ?? "—"}</TableCell>
                  <TableCell align="right">
                    S/ {line.applied.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    S/ {line.remainingAfter.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={line.isSettled ? "Saldado" : "Parcial"}
                      color={line.isSettled ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box mt={2} display="flex" gap={3} flexWrap="wrap">
            <Typography variant="body2">
              Total aplicado:{" "}
              <strong>S/ {result.totalAllocated.toFixed(2)}</strong>
            </Typography>
            {result.change > 0 && (
              <Typography variant="body2" color="warning.main">
                Vuelto: S/ {result.change.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Button variant="outlined" onClick={handleClose} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default LunchPaymentDrawer;
