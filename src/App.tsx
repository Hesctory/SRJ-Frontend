import { Admin, defaultTheme, Resource } from "react-admin";
import { MyLayout } from "./ra/layout/MyLayout";
import { dataProvider } from "./ra/dataProvider";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { createTheme } from "@mui/material";
import { AppCustomRoutes } from "./ra/CustomRoutes";
import {
  StaffResource,
  StudentsResource,
  PublishersResource,
  ProductsResource,
  SchoolYearsResource,
  AccountingPlansResource,
  InstitutionsResource,
  LevelsResource,
  GradesResource,
  GradeOfferingsResource,
  CostsResource,
  ClassroomsResource,
  WorkAreasResource,
  WorkPositionsResource,
  DebitCreditSeriesResource,
  LunchCategoriesResource,
  LunchesResource,
} from "./ra/resources";

const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
  },
});

export const App = () => (
  <Admin
    theme={lightTheme}
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={MyLayout}
    loginPage={CustomLogin}
    dashboard={Home}
  >
    {StaffResource}
    {StudentsResource}
    {PublishersResource}
    {ProductsResource}
    {SchoolYearsResource}
    {AccountingPlansResource}
    {InstitutionsResource}
    {LevelsResource}
    {GradesResource}
    {GradeOfferingsResource}
    {CostsResource}
    {ClassroomsResource}
    {WorkAreasResource}
    {WorkPositionsResource}
    {DebitCreditSeriesResource}
    {LunchCategoriesResource}
    {LunchesResource}
    <Resource name="enrollment-debts" />
    <Resource name="debt-installments" />
    <Resource name="payment-methods" />

    {AppCustomRoutes}
  </Admin>
);
