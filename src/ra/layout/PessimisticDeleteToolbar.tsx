import { DeleteButton, ListButton, SaveButton, TopToolbar } from "react-admin";
import { Box } from "@mui/material";

const PessimisticDeleteToolbar = () => (
    <TopToolbar
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
    >
        <Box display="flex" gap={1}>
            <ListButton label="Volver" size="large" sx={{ backgroundColor: 'info.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }} />
            <SaveButton size="large" />
        </Box>
        <Box>
            <DeleteButton
                mutationMode="pessimistic"
                confirmTitle="¿Eliminar estudiante?"
                confirmContent="Esta acción no se puede deshacer. ¿Estás seguro?"
                label="Eliminar estudiante"
                size="large"
                sx={{ backgroundColor: 'error.main', color: 'white', '&:hover': { backgroundColor: 'error.dark' } }}
            />
        </Box>
    </TopToolbar>
);

export default PessimisticDeleteToolbar;
