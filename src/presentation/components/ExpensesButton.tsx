import PaymentIcon from "@mui/icons-material/Payment";
import { HubButton, HubButtonTitle, HubButtonDescription } from "./HubButton";

export const ExpensesButton = () => (
  <HubButton icon={<PaymentIcon />} url="/incomes-expenses/expenses">
    <HubButtonTitle>Egresos</HubButtonTitle>
    <HubButtonDescription>
      Registra y realiza seguimiento de todos los egresos e gastos operativos de
      la institución
    </HubButtonDescription>
  </HubButton>
);
