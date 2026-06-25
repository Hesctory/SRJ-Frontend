import { Route } from "react-router-dom";
import { DailyCash } from "./routes/DailyCash";

export const dailyCashCustomRoutes = [
  <Route key="/daily-cash" path="/daily-cash" element={<DailyCash />} />,
];
