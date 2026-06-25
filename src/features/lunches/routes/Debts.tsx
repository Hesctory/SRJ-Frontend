import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL, httpClient } from "@/app/dataProvider";
import { LunchDebtSummary, PersonType } from "@/types/lunchAssignment";
import LunchPaymentDrawer from "@/features/lunches/components/LunchPaymentDrawer";
import { formatDate } from "@/utils/date";

const PERSON_TYPE_LABEL: Record<PersonType, string> = {
  student: "Estudiante",
  staff: "Personal",
  other: "Otro",
};

const PERSON_TYPE_COLOR: Record<
  PersonType,
  "primary" | "secondary" | "default"
> = {
  student: "primary",
  staff: "secondary",
  other: "default",
};

export const LunchesDebts = () => {
  const [debtSummary, setDebtSummary] = useState<LunchDebtSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [personTypeFilter, setPersonTypeFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPerson, setDrawerPerson] = useState<LunchDebtSummary | null>(
    null,
  );

  const fetchDebts = useCallback(async () => {
    setLoading(true);
    try {
      const filter: Record<string, string> = {};
      if (personTypeFilter) filter.personType = personTypeFilter;
      if (nameFilter.trim()) filter.q = nameFilter.trim();

      const url = `${API_URL}/lunch-assignments/debt-summary?range=[0,999]&filter=${encodeURIComponent(
        JSON.stringify(filter),
      )}`;
      const { json } = await httpClient(url);
      setDebtSummary(Array.isArray(json) ? json : []);
    } catch {
      setDebtSummary([]);
    } finally {
      setLoading(false);
    }
  }, [personTypeFilter, nameFilter]);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

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
      <Box
        display="flex"
        gap={2}
        mb={2}
        alignItems="center"
        sx={{ flexShrink: 0 }}
      >
        <FormControl size="small" sx={{ width: 180 }}>
          <InputLabel>Tipo de persona</InputLabel>
          <Select
            value={personTypeFilter}
            label="Tipo de persona"
            onChange={(e) => setPersonTypeFilter(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="student">Estudiantes</MenuItem>
            <MenuItem value="staff">Personal</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Buscar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ width: 240 }}
        />
      </Box>

      <Paper
        variant="outlined"
        sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : debtSummary.length === 0 ? (
          <Box p={2}>
            <Typography variant="body2" color="text.secondary">
              No hay deudas de lonchera pendientes.
            </Typography>
          </Box>
        ) : (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Persona</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="right">Asignaciones sin pagar</TableCell>
                <TableCell align="right">Deuda total</TableCell>
                <TableCell>Más antigua</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {debtSummary.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.personFullName}</TableCell>
                  <TableCell>
                    <Chip
                      label={PERSON_TYPE_LABEL[row.personType]}
                      color={PERSON_TYPE_COLOR[row.personType]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{row.unpaidCount}</TableCell>
                  <TableCell align="right">
                    S/ {row.totalDebt.toFixed(2)}
                  </TableCell>
                  <TableCell>{formatDate(row.oldestUnpaidDate)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setDrawerPerson(row);
                        setDrawerOpen(true);
                      }}
                    >
                      Cobrar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <LunchPaymentDrawer
        open={drawerOpen}
        person={drawerPerson}
        onClose={() => {
          setDrawerOpen(false);
          setDrawerPerson(null);
          fetchDebts();
        }}
      />
    </Box>
  );
};
