import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { HubButton, HubButtonTitle, HubButtonDescription } from "./HubButton";

export const AccountManagementButton = () => (
    <HubButton icon={<AccountBalanceIcon />} url="/incomes-expenses/account-management">
        <HubButtonTitle>Gestión de Cuentas</HubButtonTitle>
        <HubButtonDescription>Administra y organiza las cuentas contables, asignaciones y movimientos entre cuentas</HubButtonDescription>
    </HubButton>
);
