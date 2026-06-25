import { Route } from "react-router-dom";
import { IncomesExpensesEconomicManagement } from "./routes/EconomicManagement";
import { PaymentsDebts } from "./routes/PaymentsDebts";
import { VouchersReceipts } from "./routes/VouchersReceipts";
import { IncomesExpensesReports } from "./routes/Reports";
import { PensionReceiptsReconciliation } from "./routes/PensionReceiptsReconciliation";

export const incomesExpensesCustomRoutes = [
  <Route
    key="/incomes-expenses/economic-management"
    path="/incomes-expenses/economic-management"
    element={<IncomesExpensesEconomicManagement />}
  />,
  <Route
    key="/incomes-expenses/payments-debts"
    path="/incomes-expenses/payments-debts"
    element={<PaymentsDebts />}
  />,
  <Route
    key="/incomes-expenses/vouchers-receipts"
    path="/incomes-expenses/vouchers-receipts"
    element={<VouchersReceipts />}
  />,
  <Route
    key="/incomes-expenses/reports"
    path="/incomes-expenses/reports"
    element={<IncomesExpensesReports />}
  />,
  <Route
    key="/incomes-expenses/pension-receipts-reconciliation"
    path="/incomes-expenses/pension-receipts-reconciliation"
    element={<PensionReceiptsReconciliation />}
  />,
];
