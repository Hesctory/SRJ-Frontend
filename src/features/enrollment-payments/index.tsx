import { Route } from "react-router-dom";
import { StudentSelectionPage } from "./routes/StudentSelectionPage";
import { EnrollmentSelectionPage } from "./routes/EnrollmentSelectionPage";
import { DebtsPage } from "./routes/DebtsPage";

export const enrollmentPaymentsCustomRoutes = [
  <Route
    key="/enrollment-payments"
    path="/enrollment-payments"
    element={<StudentSelectionPage />}
  />,
  <Route
    key="/enrollment-payments/:studentId/enrollments"
    path="/enrollment-payments/:studentId/enrollments"
    element={<EnrollmentSelectionPage />}
  />,
  <Route
    key="/enrollment-payments/:studentId/:enrollmentId/debts"
    path="/enrollment-payments/:studentId/:enrollmentId/debts"
    element={<DebtsPage />}
  />,
];
