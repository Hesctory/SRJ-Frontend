import { Route } from "react-router-dom";
import { LunchesAssignment } from "./routes/Assignment";
import { LunchAssignmentForm } from "./routes/assignment/LunchAssignmentForm";
import { LunchesQueries } from "./routes/Queries";
import { PersonHistoryPage } from "./routes/queries/PersonHistoryPage";
import { LunchesDebts } from "./routes/Debts";
import { LunchesReports } from "./routes/Reports";
import { LunchesEconomicManagement } from "./routes/EconomicManagement";
import { LunchesRenditions } from "./routes/Renditions";

export { LunchCategoriesResource } from "./resources/lunch-categories";
export { LunchesResource } from "./resources/lunches";

export const lunchesCustomRoutes = [
  <Route
    key="/lunches/assignment"
    path="/lunches/assignment"
    element={<LunchesAssignment />}
  />,
  <Route
    key="/lunches/assignment/:personId"
    path="/lunches/assignment/:personId"
    element={<LunchAssignmentForm />}
  />,
  <Route
    key="/lunches/queries"
    path="/lunches/queries"
    element={<LunchesQueries />}
  />,
  <Route
    key="/lunches/queries/:personId"
    path="/lunches/queries/:personId"
    element={<PersonHistoryPage />}
  />,
  <Route
    key="/lunches/debts"
    path="/lunches/debts"
    element={<LunchesDebts />}
  />,
  <Route
    key="/lunches/reports"
    path="/lunches/reports"
    element={<LunchesReports />}
  />,
  <Route
    key="/lunches/economic-management"
    path="/lunches/economic-management"
    element={<LunchesEconomicManagement />}
  />,
  <Route
    key="/lunches/renditions"
    path="/lunches/renditions"
    element={<LunchesRenditions />}
  />,
];
