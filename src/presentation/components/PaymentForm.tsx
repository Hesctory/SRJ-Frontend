import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetList } from "react-admin";
import { PaymentFormValues, PaymentMethod } from "../../types/payment";

interface PaymentFormProps {
  onSubmit: (values: PaymentFormValues) => void;
  submitting?: boolean;
}

const today = () => new Date().toISOString().split("T")[0];

const PaymentForm = ({ onSubmit, submitting = false }: PaymentFormProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState<string | number>("");
  const [date, setDate] = useState(today());

  const { data: methods, isLoading: loadingMethods } =
    useGetList<PaymentMethod>("payment-methods", {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "name", order: "ASC" },
    });

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0 || !paymentMethodId || !date) return;
    onSubmit({ amount: parsedAmount, paymentMethodId, date });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="subtitle2">Formulario de pago</Typography>

      <TextField
        label="Monto"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        inputProps={{ min: 0, step: "0.01" }}
        size="small"
        fullWidth
      />

      <FormControl size="small" fullWidth>
        <InputLabel>Método de pago</InputLabel>
        <Select
          value={paymentMethodId}
          onChange={(e) => setPaymentMethodId(e.target.value)}
          label="Método de pago"
          disabled={loadingMethods}
        >
          {methods?.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
        disabled={submitting || !amount || !paymentMethodId || !date}
        startIcon={submitting ? <CircularProgress size={16} /> : null}
      >
        Pagar
      </Button>
    </Box>
  );
};

export default PaymentForm;
