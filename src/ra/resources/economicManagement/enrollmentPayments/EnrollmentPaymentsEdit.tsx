import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOne, useGetList } from "react-admin";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

const MONTH_NAMES: Record<number, string> = {
    1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril",
    5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto",
    9: "Setiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre",
};

interface Tuition {
    monthId: number;
    tuitionCost: number;
    amountPaid: number;
    dueDate: string;
    status: string;
    paymentIds: number[];
}

interface EnrollmentPayment {
    id: number;
    enrollmentId: number;
    tuitions: Tuition[];
}

export const EnrollmentPaymentsEdit = () => {
    const { studentId, enrollmentId } = useParams<{ studentId: string; enrollmentId: string }>();

    const { data: student, isPending: studentLoading } = useGetOne(
        "students",
        { id: Number(studentId) },
        { enabled: !!studentId }
    );

    const { data: enrollment, isPending: enrollmentLoading } = useGetOne(
        "enrollments",
        { id: Number(enrollmentId) },
        { enabled: !!enrollmentId }
    );

    const { data: paymentRecords, isPending: paymentLoading } = useGetList<EnrollmentPayment>(
        "enrollment-payments",
        {
            filter: { enrollmentId: Number(enrollmentId) },
            pagination: { page: 1, perPage: 1 },
        },
        { enabled: !!enrollmentId }
    );

    const [selectedMonthId, setSelectedMonthId] = useState<number | null>(null);
    const [amountToPay, setAmountToPay] = useState<string>("");
    const [localFees, setLocalFees] = useState<Record<number, number[]>>({});

    const isLoading = studentLoading || enrollmentLoading || paymentLoading;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={6}>
                <CircularProgress />
            </Box>
        );
    }

    const paymentRecord = paymentRecords?.[0];
    const tuitions: Tuition[] = paymentRecord?.tuitions ?? [];

    const selectedTuition = tuitions.find((t) => t.monthId === selectedMonthId) ?? null;
    const extraFees = selectedMonthId ? (localFees[selectedMonthId] ?? []) : [];
    const totalPaid = selectedTuition
        ? selectedTuition.amountPaid + extraFees.reduce((s, f) => s + f, 0)
        : 0;

    return (
        <Box p={3} display="flex" flexDirection="column" gap={3}>
            {/* Header */}
            <Box>
                <Typography variant="h5" fontWeight="bold">
                    {student?.fullName ?? "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    DNI: {student?.dni ?? "—"} &nbsp;|&nbsp; Código: {student?.enrollmentCode ?? "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Grado: {student?.grade ?? "—"} {student?.section ?? ""} &nbsp;|&nbsp;
                    Matrícula: S/ {enrollment?.enrollmentPrice ?? "—"} &nbsp;|&nbsp;
                    Estado: {enrollment?.paymentStatus ?? "—"}
                </Typography>
            </Box>

            <Divider />

            {tuitions.length === 0 ? (
                <Typography color="text.secondary">
                    No se encontraron cuotas para esta matrícula.
                </Typography>
            ) : (
                <Box display="flex" gap={3} width="100%">
                    {/* Left: months list */}
                    <Box width="50%">
                        <Grid container spacing={2}>
                            {tuitions.map((tuition) => {
                                const isPaid =
                                    tuition.status === "paid" ||
                                    tuition.amountPaid + (localFees[tuition.monthId]?.reduce((s, f) => s + f, 0) ?? 0) >= tuition.tuitionCost;
                                return (
                                    <Grid size={12} key={tuition.monthId}>
                                        <Paper variant="outlined" sx={{ px: 2, py: 1.5 }}>
                                            <Grid container alignItems="center">
                                                <Grid size={8}>
                                                    <Typography>
                                                        {MONTH_NAMES[tuition.monthId] ?? `Mes ${tuition.monthId}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid size={4} display="flex" gap={1}>
                                                    <Button
                                                        variant={isPaid ? "outlined" : "contained"}
                                                        onClick={() => {
                                                            setSelectedMonthId(tuition.monthId);
                                                            setAmountToPay("");
                                                        }}
                                                    >
                                                        {isPaid ? "Detalles" : "Pagar"}
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        disabled={!isPaid}
                                                    >
                                                        Enviar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>

                    {/* Right: payment form */}
                    {selectedMonthId !== null && selectedTuition && (
                        <Box width="50%" display="flex" flexDirection="column" gap={2}>
                            <Typography variant="h6">
                                {MONTH_NAMES[selectedMonthId] ?? `Mes ${selectedMonthId}`}
                            </Typography>
                            <Divider />

                            <TextField
                                label="Monto"
                                type="number"
                                value={selectedTuition.tuitionCost}
                                disabled
                            />

                            <TextField
                                label="Fecha de vencimiento"
                                type="date"
                                value={selectedTuition.dueDate}
                                disabled
                                slotProps={{ inputLabel: { shrink: true } }}
                            />

                            <TextField
                                label="Monto pagado"
                                type="number"
                                value={totalPaid}
                                disabled
                            />

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>Cuotas</Typography>
                                {selectedTuition.paymentIds.length === 0 && extraFees.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        Sin cuotas registradas
                                    </Typography>
                                ) : (
                                    <List dense disablePadding>
                                        {selectedTuition.paymentIds.map((id, i) => (
                                            <ListItem key={`server-${id}`} disableGutters>
                                                <ListItemText primary={`Cuota ${i + 1}: ID #${id}`} />
                                            </ListItem>
                                        ))}
                                        {extraFees.map((fee, i) => (
                                            <ListItem key={`local-${i}`} disableGutters>
                                                <ListItemText
                                                    primary={`Cuota ${selectedTuition.paymentIds.length + i + 1}: S/ ${fee}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
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
                                    setLocalFees((prev) => ({
                                        ...prev,
                                        [selectedMonthId]: [...(prev[selectedMonthId] ?? []), payment],
                                    }));
                                    setAmountToPay("");
                                }}
                            >
                                Registrar pago
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};
