import { Admin, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "./i18n/es";
import { MyLayout } from "./ra/layout/MyLayout";
import { theme } from "./ra/theme";
import { dataProvider } from "./ra/dataProvider";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { AppCustomRoutes } from "./ra/CustomRoutes";
import {
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
} from "./ra/resources";
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
