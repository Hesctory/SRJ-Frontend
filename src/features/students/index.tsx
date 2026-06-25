import { Route } from "react-router-dom";
import { StudentReports } from "./reports/StudentReports";
import { studentReportRoutes } from "./reports/routes";

export { StudentsResource } from "./management";

/**
 * All custom (non-CRUD) routes for the students feature: the report hub plus
 * one route per hub card, both derived from `studentReportRoutes`.
 * Spread into <CustomRoutes> in App's route registration.
 */
export const studentCustomRoutes = [
  <Route
    key="/students/reports"
    path="/students/reports"
    element={<StudentReports />}
  />,
  ...studentReportRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  )),
];
