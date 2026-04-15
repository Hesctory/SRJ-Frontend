import { useState } from "react";
import { Edit, SimpleForm } from "react-admin";
import {
    Box,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

const MONTHS = [
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

interface MonthData {
    amount: number;
    dueAt: string;
    fees: number[];
}

const DEFAULT_MONTH_DATA: MonthData = {
    amount: 300,
    dueAt: "",
    fees: [],
};

export const EnrollmentPaymentsEdit = () => {
    const [paidMonths, setPaidMonths] = useState<Record<string, boolean>>(
        Object.fromEntries(MONTHS.map((m) => [m, false]))
    );
    const [monthData, setMonthData] = useState<Record<string, MonthData>>(
        Object.fromEntries(MONTHS.map((m) => [m, { ...DEFAULT_MONTH_DATA }]))
    );
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [amountToPay, setAmountToPay] = useState<string>("");

    const handlePayClick = (month: string) => {
        setSelectedMonth(month);
        setAmountToPay("");
    };

    const selectedData = selectedMonth ? monthData[selectedMonth] : null;
    const amountPaid = selectedData ? selectedData.fees.reduce((sum, f) => sum + f, 0) : 0;

    return (
        <Edit resource="enrollment-payments">
            <SimpleForm toolbar={false}>
                <Box display="flex" gap={3} width="100%">

                    {/* Left: months list */}
                    <Box width="50%">
                        <Grid container spacing={2}>
                            {MONTHS.map((month) => (
                                <Grid size={12} key={month}>
                                    <Paper variant="outlined" sx={{ px: 2, py: 1.5 }}>
                                        <Grid container alignItems="center">
                                            <Grid size={8}>
                                                <Typography>{month}</Typography>
                                            </Grid>
                                            <Grid size={4} display="flex" gap={1}>
                                                {paidMonths[month]
                                                    ? <Button variant="outlined" onClick={() => handlePayClick(month)}>Detalles</Button>
                                                    : <Button variant="contained" onClick={() => handlePayClick(month)}>Pagar</Button>
                                                }
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    disabled={!paidMonths[month]}
                                                >
                                                    Enviar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Right: payment form */}
                    {selectedMonth && selectedData && (
                        <Box width="50%" display="flex" flexDirection="column" gap={2}>
                            <Typography variant="h6">{selectedMonth}</Typography>
                            <Divider />

                            <TextField
                                label="Monto"
                                type="number"
                                value={selectedData.amount}
                                disabled
                            />

                            <TextField
                                label="Fecha de vencimiento"
                                type="date"
                                value={selectedData.dueAt}
                                disabled
                                slotProps={{ inputLabel: { shrink: true } }}
                            />

                            <TextField
                                label="Monto pagado"
                                type="number"
                                value={amountPaid}
                                disabled
                            />

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>Cuotas</Typography>
                                {selectedData.fees.length === 0
                                    ? <Typography variant="body2" color="text.secondary">Sin cuotas registradas</Typography>
                                    : (
                                        <List dense disablePadding>
                                            {selectedData.fees.map((fee, i) => (
                                                <ListItem key={i} disableGutters>
                                                    <ListItemText primary={`Cuota ${i + 1}: S/ ${fee}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )
                                }
                            </Box>

                            <TextField
                                label="Monto a pagar"
                                type="number"
                                value={amountToPay}
                                onChange={(e) => setAmountToPay(e.target.value)}
                            />

                            <Button
                                variant="contained"
                                disabled={!amountToPay || Number(amountToPay) <= 0}
                                onClick={() => {
                                    const payment = Number(amountToPay);
                                    const newFees = [...selectedData.fees, payment];
                                    const newAmountPaid = newFees.reduce((sum, f) => sum + f, 0);
                                    setMonthData((prev) => ({
                                        ...prev,
                                        [selectedMonth]: { ...prev[selectedMonth], fees: newFees },
                                    }));
                                    if (newAmountPaid >= selectedData.amount) {
                                        setPaidMonths((prev) => ({ ...prev, [selectedMonth]: true }));
                                    }
                                    setAmountToPay("");
                                }}
                            >
                                Registrar pago
                            </Button>
                        </Box>
                    )}
                </Box>
            </SimpleForm>
        </Edit>
    );
};
