import { DeleteButton, ListButton, SaveButton, TopToolbar } from "react-admin";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface CRUDToolBarProps {
  save?: boolean;
  delete?: boolean;
  children?: ReactNode;
  resource?: string;
}

const CRUDToolBar = ({
  save,
  delete: showDelete,
  children,
  resource,
}: CRUDToolBarProps) => (
  <TopToolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Box display="flex" gap={1}>
      <ListButton
        label="Volver"
        size="large"
        resource={resource}
        sx={{
          backgroundColor: "info.main",
          color: "white",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
      />
      {save && <SaveButton size="large" label="Guardar" />}
    </Box>
    {children}
    {showDelete && (
      <Box>
        <DeleteButton
          mutationMode="pessimistic"
          confirmTitle="¿Eliminar registro?"
          confirmContent="Esta acción no se puede deshacer. ¿Estás seguro?"
          label="Eliminar"
          size="large"
          sx={{
            backgroundColor: "error.main",
            color: "white",
            "&:hover": { backgroundColor: "error.dark" },
          }}
        />
      </Box>
    )}
  </TopToolbar>
);

export default CRUDToolBar;
