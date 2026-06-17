import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useGetOne } from "react-admin";
import { useParams, useSearchParams } from "react-router-dom";
import { API_URL, httpClient } from "../../../dataProvider";
import {
  LunchAssignment,
  LunchDebtSummary,
  PersonType,
} from "../../../../types/lunchAssignment";
import LunchPaymentDrawer from "../../../../presentation/components/LunchPaymentDrawer";
import { formatDate, todayLocal } from "../../../../utils/date";

const statusChip = (hasDebt: boolean, isSettled: boolean) => {
  if (isSettled) return <Chip label="Saldado" color="success" size="small" />;
  if (hasDebt) return <Chip label="Con deuda" color="error" size="small" />;
  return <Chip label="Pagado" color="success" size="small" />;
};

export const PersonHistoryPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const [searchParams] = useSearchParams();
  const kind: PersonType =
    searchParams.get("type") === "staff" ? "staff" : "student";
  const resource = kind === "staff" ? "staff-members" : "students";
  const id = Number(personId);

  const { data: person } = useGetOne(
    resource,
    { id: personId! },
    { enabled: !!personId },
  );

  const [date, setDate] = useState(todayLocal());
  const [assignments, setAssignments] = useState<LunchAssignment[]>([]);
  const [loading, setLoading] = useState(false);

  const [debt, setDebt] = useState<LunchDebtSummary | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchAssignments = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const filter = JSON.stringify({ personId: id, assignedDate: date });
      const url = `${API_URL}/lunch-assignments?range=[0,99]&filter=${encodeURIComponent(filter)}`;
      const { json } = await httpClient(url);
      setAssignments(Array.isArray(json) ? json : []);
    } catch {
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [id, date]);

  const fetchDebt = useCallback(async () => {
    if (!id) return;
    try {
      const filter = JSON.stringify({ personType: kind });
      const url = `${API_URL}/lunch-assignments/debt-summary?range=[0,999]&filter=${encodeURIComponent(filter)}`;
      const { json } = await httpClient(url);
      const rows: LunchDebtSummary[] = Array.isArray(json) ? json : [];
      setDebt(rows.find((r) => r.id === id) ?? null);
    } catch {
      setDebt(null);
    }
  }, [id, kind]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  useEffect(() => {
    fetchDebt();
  }, [fetchDebt]);

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      sx={{
        height: "calc(100vh - 64px)",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Person + debt banner + date control on one compact row */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        mb={2}
        sx={{ flexShrink: 0 }}
      >
        <Typography variant="h6" fontWeight={600}>
          {person?.fullName ?? "Cargando..."}
        </Typography>
        <Chip
          label={kind === "staff" ? "Personal" : "Estudiante"}
          size="small"
          variant="outlined"
        />

        <TextField
          type="date"
          label="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />

        <Box flex={1} />

        {debt && (
          <>
            <Typography variant="body2" color="error.main">
              Deuda: <strong>S/ {debt.totalDebt.toFixed(2)}</strong> (
              {debt.unpaidCount} sin pagar)
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setDrawerOpen(true)}
            >
              Cobrar
            </Button>
          </>
        )}
      </Box>

      {/* History for the selected date — only this list scrolls */}
      <Paper
        variant="outlined"
        sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : assignments.length === 0 ? (
          <Box p={2}>
            <Typography variant="body2" color="text.secondary">
              Sin loncheras para el {formatDate(date)}.
            </Typography>
          </Box>
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Lonchera</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Saldo pendiente</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.lunchName ?? "—"}</TableCell>
                  <TableCell align="right">
                    S/ {a.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    S/ {a.balanceDue.toFixed(2)}
                  </TableCell>
                  <TableCell>{statusChip(a.hasDebt, a.isSettled)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <LunchPaymentDrawer
        open={drawerOpen}
        person={debt}
        onClose={() => {
          setDrawerOpen(false);
          fetchAssignments();
          fetchDebt();
        }}
      />
    </Box>
  );
};
