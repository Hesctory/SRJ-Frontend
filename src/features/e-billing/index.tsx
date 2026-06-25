import { Route } from "react-router-dom";
import { SunatSummary } from "./routes/SunatSummary";
import { EBillingReports } from "./routes/Reports";

export { DebitCreditSeriesResource } from "./resources/debit-credit-series";

export const eBillingCustomRoutes = [
  <Route
    key="/e-billing/sunat-summary"
    path="/e-billing/sunat-summary"
    element={<SunatSummary />}
  />,
  <Route
    key="/e-billing/reports"
    path="/e-billing/reports"
    element={<EBillingReports />}
  />,
];
