import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Confirm,
  useDelete,
  useGetList,
  useNotify,
  useRecordContext,
  useRefresh,
} from "react-admin";
import { Account } from "../../../../types/accountingPlan";

interface SubaccountsPanelProps {
  onEdit: (record: Account) => void;
  onAdd: (parentId: number) => void;
}

const SubaccountsPanel = ({ onEdit, onAdd }: SubaccountsPanelProps) => {
  const parent = useRecordContext<Account>();
  const notify = useNotify();
  const refresh = useRefresh();
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);

  const { data, total, isLoading } = useGetList<Account>("accounting-plan", {
    filter: { parentAccountId: parent?.id },
    pagination: { page: 1, perPage: 15 },
    sort: { field: "code", order: "ASC" },
  });

  const [deleteOne, { isPending: isDeleting }] = useDelete();

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteOne(
      "accounting-plan",
      { id: deleteTarget.id, previousData: deleteTarget },
      {
        onSuccess: () => {
          notify("Subcuenta eliminada", { type: "success" });
          refresh();
          setDeleteTarget(null);
        },
        onError: () => {
          notify("Error al eliminar subcuenta", { type: "error" });
          setDeleteTarget(null);
        },
      }
    );
  };

  if (!parent) return null;

  return (
    <>
    <Box sx={{ p: 2, pl: 6, bgcolor: "background.default" }}>
      {/*<Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle2" color="text.secondary">
          Subcuentas
        </Typography>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => onAdd(parent.id as number)}
          variant="outlined"
        >
          Agregar subcuenta
        </Button>
      </Box>*/}

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={20} />
        </Box>
      ) : !data || data.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
          Sin subcuentas. Usa el botón de arriba para agregar la primera.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "15%" }}>Código</TableCell>
                  <TableCell sx={{ width: "15%" }}>Cód. Impresión</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right" sx={{ width: "10%" }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((sub) => (
                  <TableRow key={sub.id} hover>
                    <TableCell>{sub.code}</TableCell>
                    <TableCell>{sub.printCode}</TableCell>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <IconButton
                        size="small"
                        title="Editar"
                        onClick={() => onEdit(sub)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        title="Eliminar"
                        onClick={() => setDeleteTarget(sub)}
                        disabled={isDeleting}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {total !== undefined && total > 15 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Mostrando 15 de {total} subcuentas
            </Typography>
          )}
        </>
      )}
    </Box>

    <Confirm
      isOpen={!!deleteTarget}
      title="Eliminar subcuenta"
      content={`¿Estás seguro de que deseas eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
      onConfirm={handleDeleteConfirm}
      onClose={() => setDeleteTarget(null)}
    />
    </>
  );
};

export default SubaccountsPanel;
