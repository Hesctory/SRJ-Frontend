import SavingsIcon from "@mui/icons-material/Savings";
import { HubButton, HubButtonTitle, HubButtonDescription } from "./HubButton";

export const AccountStateButton = () => (
    <HubButton icon={<SavingsIcon />} url="/incomes-expenses/account-state">
        <HubButtonTitle>Estado de Cuenta</HubButtonTitle>
        <HubButtonDescription>Consulta el estado actual de las cuentas, saldos disponibles y movimientos recientes</HubButtonDescription>
    </HubButton>
);
