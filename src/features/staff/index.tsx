import { Route } from "react-router-dom";
import { StaffReports } from "./routes/StaffReports";

export { StaffMembersResource } from "./resources";

export const staffCustomRoutes = [
  <Route
    key="/staff/reports"
    path="/staff/reports"
    element={<StaffReports />}
  />,
];
