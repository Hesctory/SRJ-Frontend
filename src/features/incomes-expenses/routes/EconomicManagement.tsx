import { AccountManagementButton } from "@/features/incomes-expenses/components/AccountManagementButton";
import { AccountStateButton } from "@/features/incomes-expenses/components/AccountStateButton";
import { ExpensesButton } from "@/features/incomes-expenses/components/ExpensesButton";
import { HubLayout } from "@/shared/components/HubLayout";
import { TuitionsButton } from "@/features/incomes-expenses/components/TuitionsButton";

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
