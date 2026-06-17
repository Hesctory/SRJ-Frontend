import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetList, useGetOne } from "react-admin";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Lunch } from "../../../../types/lunch";
import useLunchAssignment from "../../../../presentation/hooks/useLunchAssignment";
import { todayLocal } from "../../../../utils/date";

interface Shift {
  id: number;
  name: string;
}

export const LunchAssignmentForm = () => {
  const { personId } = useParams<{ personId: string }>();
  const [searchParams] = useSearchParams();
  const personType = searchParams.get("type") ?? "student";
  const navigate = useNavigate();
  const { create, submitting } = useLunchAssignment();

  const resource = personType === "student" ? "students" : "staff-members";

  const { data: person } = useGetOne(
    resource,
    { id: personId! },
    { enabled: !!personId },
  );

  const { data: lunches = [] } = useGetList<Lunch>("lunches", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "lunchName", order: "ASC" },
  });

  const { data: shifts = [] } = useGetList<Shift>("shifts", {
    pagination: { page: 1, perPage: 100 },
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [assignedDate, setAssignedDate] = useState(todayLocal());
  const [shiftId, setShiftId] = useState<number | "">("");
  const [amountPaid, setAmountPaid] = useState("");
  const [lunchSearch, setLunchSearch] = useState("");

  useEffect(() => {
    if (shifts.length > 0 && shiftId === "") {
      setShiftId(shifts[0].id);
    }
  }, [shifts, shiftId]);

  const filteredLunches = lunches.filter(
    (l) =>
      !lunchSearch.trim() ||
      (l.lunchName ?? "").toLowerCase().includes(lunchSearch.toLowerCase()),
  );

  const selectedLunches = lunches.filter((l) => selectedIds.includes(l.id));
  const totalSalePrice = selectedLunches.reduce(
    (sum, l) => sum + (l.salePrice ?? 0),
    0,
  );

  const toggleLunch = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleSubmit = async () => {
    if (!personId || selectedIds.length === 0 || !shiftId) return;

    const parsed = parseFloat(amountPaid);
    const payload = {
      personId: Number(personId),
      lunchIds: selectedIds,
      assignedDate,
      shiftId: shiftId as number,
      ...(!isNaN(parsed) &&
        parsed > 0 && { amountPaid: Math.round(parsed * 100) / 100 }),
    };

    const ok = await create(payload);
    if (ok) {
      navigate("/lunches/assignment");
    }
  };

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
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={2}
        sx={{ flexShrink: 0 }}
      >
        <Typography variant="h6" fontWeight={600}>
          {person?.fullName ?? "Cargando..."}
        </Typography>
        <Chip
          label={personType === "student" ? "Estudiante" : "Personal"}
          size="small"
          variant="outlined"
        />
      </Box>

      {/* Two-column body — fills all remaining height */}
      <Box
        display="flex"
        gap={2}
        alignItems="stretch"
        sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}
      >
        {/* LEFT — lunch catalog, grows to fill available height */}
        <Box
          flex="1"
          maxWidth={700}
          minWidth={320}
          display="flex"
          flexDirection="column"
          sx={{ overflow: "hidden", minHeight: 0 }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Buscar lonchera..."
            value={lunchSearch}
            onChange={(e) => setLunchSearch(e.target.value)}
            sx={{ mb: 1, flexShrink: 0 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {filteredLunches.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 2, flexShrink: 0 }}>
              <Typography variant="body2" color="text.secondary">
                {lunches.length === 0
                  ? "No hay loncheras disponibles"
                  : "Sin resultados para la búsqueda"}
              </Typography>
            </Paper>
          ) : (
            <Paper
              variant="outlined"
              sx={{ flex: 1, overflowY: "auto", py: 0.5, minHeight: 0 }}
            >
              {filteredLunches.map((lunch) => (
                <Box
                  key={lunch.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  px={1.5}
                  py={0.25}
                  onClick={() => toggleLunch(lunch.id)}
                  sx={{
                    "&:hover": { bgcolor: "action.hover" },
                    cursor: "pointer",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedIds.includes(lunch.id)}
                        onChange={() => toggleLunch(lunch.id)}
                        size="small"
                        sx={{ py: 0.25 }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {lunch.lunchName ?? `Lonchera #${lunch.id}`}
                      </Typography>
                    }
                    sx={{ m: 0, flex: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{ whiteSpace: "nowrap", ml: 1 }}
                  >
                    S/ {(lunch.salePrice ?? 0).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* RIGHT — control panel, natural height */}
        <Box
          flex="0 0 280px"
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ alignSelf: "flex-start" }}
        >
          <TextField
            type="date"
            label="Fecha"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <FormControl size="small" fullWidth>
            <InputLabel>Turno</InputLabel>
            <Select
              value={shiftId}
              label="Turno"
              onChange={(e) => setShiftId(e.target.value as number)}
            >
              {shifts.map((sh) => (
                <MenuItem key={sh.id} value={sh.id}>
                  {sh.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography
            variant="body2"
            color={selectedIds.length > 0 ? "text.secondary" : "text.disabled"}
          >
            {selectedIds.length > 0
              ? `${selectedIds.length} lonchera${selectedIds.length !== 1 ? "s" : ""} · S/ ${totalSalePrice.toFixed(2)}`
              : "Sin loncheras seleccionadas"}
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              label="Monto pagado"
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              inputProps={{ min: 0, step: "0.01" }}
              size="small"
              fullWidth
              disabled={selectedIds.length === 0}
            />
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => setAmountPaid(totalSalePrice.toFixed(2))}
              disabled={selectedIds.length === 0}
            >
              Pago completo
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              submitting ||
              selectedIds.length === 0 ||
              !assignedDate ||
              !shiftId
            }
            startIcon={
              submitting ? <CircularProgress size={16} color="inherit" /> : null
            }
            fullWidth
          >
            {submitting
              ? "Asignando..."
              : `Asignar${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
