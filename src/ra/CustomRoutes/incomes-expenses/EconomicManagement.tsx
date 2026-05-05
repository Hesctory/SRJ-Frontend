import { AccountManagementButton } from "../../../presentation/components/AccountManagementButton";
import { AccountStateButton } from "../../../presentation/components/AccountStateButton";
import { ExpensesButton } from "../../../presentation/components/ExpensesButton";
import { HubLayout } from "../../../presentation/components/HubLayout";
import { TuitionsButton } from "../../../presentation/components/TuitionsButton";

export const IncomesExpensesEconomicManagement = () => {
  return (
    <HubLayout title="Gestión Económica">
      <TuitionsButton />
      <ExpensesButton />
      <AccountStateButton />
      <AccountManagementButton />
    </HubLayout>
  );
};
