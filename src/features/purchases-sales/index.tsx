import { Route } from "react-router-dom";
import { PurchasesSalesEconomicManagement } from "./routes/EconomicManagement";
import { PaymentTracking } from "./routes/PaymentTracking";
import { PensionVouchersReconciliation } from "./routes/PensionVouchersReconciliation";
import { PurchasesSalesReports } from "./routes/Reports";

export { PublishersResource } from "./resources/publishers";
export { ProductsResource } from "./resources/products";

export const purchasesSalesCustomRoutes = [
  <Route
    key="/purchases-sales/economic-management"
    path="/purchases-sales/economic-management"
    element={<PurchasesSalesEconomicManagement />}
  />,
  <Route
    key="/purchases-sales/payment-tracking"
    path="/purchases-sales/payment-tracking"
    element={<PaymentTracking />}
  />,
  <Route
    key="/purchases-sales/pension-vouchers-reconciliation"
    path="/purchases-sales/pension-vouchers-reconciliation"
    element={<PensionVouchersReconciliation />}
  />,
  <Route
    key="/purchases-sales/reports"
    path="/purchases-sales/reports"
    element={<PurchasesSalesReports />}
  />,
];
