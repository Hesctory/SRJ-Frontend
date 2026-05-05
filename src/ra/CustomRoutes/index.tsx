import { CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

import { StudentEnrollPage } from "../../presentation/pages/StudentEnrollPage";
import { StudentReports } from "./students/StudentReports";
import { StaffReports } from "./staff/StaffReports";
import { PurchasesSalesEconomicManagement } from "./purchases-sales/EconomicManagement";
import { PaymentTracking } from "./purchases-sales/PaymentTracking";
import { PensionVouchersReconciliation } from "./purchases-sales/PensionVouchersReconciliation";
import { PurchasesSalesReports } from "./purchases-sales/Reports";
import { SunatSummary } from "./e-billing/SunatSummary";
import { EBillingReports } from "./e-billing/Reports";
import { IncomesExpensesEconomicManagement } from "./incomes-expenses/EconomicManagement";
import { PaymentsDebts } from "./incomes-expenses/PaymentsDebts";
import { VouchersReceipts } from "./incomes-expenses/VouchersReceipts";
import { IncomesExpensesReports } from "./incomes-expenses/Reports";
import { PensionReceiptsReconciliation } from "./incomes-expenses/PensionReceiptsReconciliation";
import { LunchesAssignment } from "./lunches/Assignment";
import { LunchesQueries } from "./lunches/Queries";
import { LunchesReports } from "./lunches/Reports";
import { LunchesEconomicManagement } from "./lunches/EconomicManagement";
import { LunchesRenditions } from "./lunches/Renditions";
import { DailyCash } from "./daily-cash/DailyCash";
import { EnrollmentSelectorPage } from "./enrollmentPayments/EnrollmentSelectorPage";
import { EnrollmentPaymentsEdit } from "../resources/economicManagement/enrollmentPayments/EnrollmentPaymentsEdit";

export const AppCustomRoutes = (
  <CustomRoutes>
    {/* Students */}
    <Route path="/students/create" element={<StudentEnrollPage />} />
    <Route path="/students/reports" element={<StudentReports />} />
    {/* Staff */}
    <Route path="/staff/reports" element={<StaffReports />} />
    {/* Purchases & Sales */}
    <Route
      path="/purchases-sales/economic-management"
      element={<PurchasesSalesEconomicManagement />}
    />
    <Route
      path="/purchases-sales/payment-tracking"
      element={<PaymentTracking />}
    />
    <Route
      path="/purchases-sales/pension-vouchers-reconciliation"
      element={<PensionVouchersReconciliation />}
    />
    <Route
      path="/purchases-sales/reports"
      element={<PurchasesSalesReports />}
    />
    {/* E-Billing */}
    <Route path="/e-billing/sunat-summary" element={<SunatSummary />} />
    <Route path="/e-billing/reports" element={<EBillingReports />} />
    {/* Incomes & Expenses */}
    <Route
      path="/incomes-expenses/economic-management"
      element={<IncomesExpensesEconomicManagement />}
    />
    <Route
      path="/incomes-expenses/payments-debts"
      element={<PaymentsDebts />}
    />
    <Route
      path="/incomes-expenses/vouchers-receipts"
      element={<VouchersReceipts />}
    />
    <Route
      path="/incomes-expenses/reports"
      element={<IncomesExpensesReports />}
    />
    <Route
      path="/incomes-expenses/pension-receipts-reconciliation"
      element={<PensionReceiptsReconciliation />}
    />
    {/* Lunches */}
    <Route path="/lunches/assignment" element={<LunchesAssignment />} />
    <Route path="/lunches/queries" element={<LunchesQueries />} />
    <Route path="/lunches/reports" element={<LunchesReports />} />
    <Route
      path="/lunches/economic-management"
      element={<LunchesEconomicManagement />}
    />
    <Route path="/lunches/renditions" element={<LunchesRenditions />} />
    {/* Enrollment Payments */}
    <Route
      path="/enrollment-selector/:id"
      element={<EnrollmentSelectorPage />}
    />
    <Route
      path="/enrollment-payments/:studentId/:enrollmentId"
      element={<EnrollmentPaymentsEdit />}
    />
    {/* Daily Cash */}
    <Route path="/daily-cash" element={<DailyCash />} />
  </CustomRoutes>
);
