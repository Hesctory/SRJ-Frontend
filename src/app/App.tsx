import { Admin, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "./i18n/es";
import { MyLayout } from "@/app/layout/MyLayout";
import { theme } from "@/app/theme";
import { dataProvider } from "@/app/dataProvider";
import authProvider from "@/app/authProvider";
import CustomLogin from "@/app/pages/CustomLogin";
import { Home } from "@/app/pages/Home";
import {
  AppCustomRoutes,
  StaffMembersResource,
  StudentsResource,
  PublishersResource,
  ProductsResource,
  SchoolYearsResource,
  AccountingPlanResource,
  InstitutionsResource,
  LevelsResource,
  GradesResource,
  GradeOfferingsResource,
  CostsResource,
  ClassroomsResource,
  WorkAreasResource,
  JobPositionsResource,
  DebitCreditSeriesResource,
  LunchCategoriesResource,
  LunchesResource,
} from "@/features";
import { BrowserRouter } from "react-router-dom";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

export const App = () => (
  <BrowserRouter>
    <Admin
      requireAuth
      theme={theme}
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={MyLayout}
      loginPage={CustomLogin}
      dashboard={Home}
    >
      {StaffMembersResource}
      {StudentsResource}
      {PublishersResource}
      {ProductsResource}
      {SchoolYearsResource}
      {AccountingPlanResource}
      {InstitutionsResource}
      {LevelsResource}
      {GradesResource}
      {GradeOfferingsResource}
      {CostsResource}
      {ClassroomsResource}
      {WorkAreasResource}
      {JobPositionsResource}
      {DebitCreditSeriesResource}
      {LunchCategoriesResource}
      {LunchesResource}
      <Resource name="lunch-assignments" />
      <Resource name="employment-contracts" />
      <Resource name="enrollment-debts" />
      <Resource name="debt-installments" />
      <Resource name="payment-methods" />

      {AppCustomRoutes}
    </Admin>
  </BrowserRouter>
);
