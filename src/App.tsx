import { Admin, defaultTheme } from "react-admin";
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
  EnrolledStudentsReportResource,
  PublishersResource,
  ProductsResource,
  SchoolYearsResource,
  AccountingPlansResource,
  InstitutionsResource,
  LevelsResource,
  GradesResource,
  GradeOfferingsResource,
  SectionsResource,
  CostsResource,
  ClassroomsResource,
  WorkAreasResource,
  WorkPositionsResource,
  DebitCreditSeriesResource,
  LunchCategoriesResource,
  LunchesResource,
  EnrollmentPaymentsResource,
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
    {EnrolledStudentsReportResource}
    {PublishersResource}
    {ProductsResource}
    {SchoolYearsResource}
    {AccountingPlansResource}
    {InstitutionsResource}
    {LevelsResource}
    {GradesResource}
    {GradeOfferingsResource}
    {SectionsResource}
    {CostsResource}
    {ClassroomsResource}
    {WorkAreasResource}
    {WorkPositionsResource}
    {DebitCreditSeriesResource}
    {LunchCategoriesResource}
    {LunchesResource}
    {EnrollmentPaymentsResource}

    {AppCustomRoutes}
  </Admin>
);
