import { CustomRoutes } from "react-admin";

import { StudentsResource, studentCustomRoutes } from "./students";
import { StaffMembersResource, staffCustomRoutes } from "./staff";
import {
  PublishersResource,
  ProductsResource,
  purchasesSalesCustomRoutes,
} from "./purchases-sales";
import {
  LunchCategoriesResource,
  LunchesResource,
  lunchesCustomRoutes,
} from "./lunches";
import { DebitCreditSeriesResource, eBillingCustomRoutes } from "./e-billing";
import { incomesExpensesCustomRoutes } from "./incomes-expenses";
import { dailyCashCustomRoutes } from "./daily-cash";
import { enrollmentPaymentsCustomRoutes } from "./enrollment-payments";

// Resources — re-exported for registration in App.
export {
  StudentsResource,
  StaffMembersResource,
  PublishersResource,
  ProductsResource,
  LunchCategoriesResource,
  LunchesResource,
  DebitCreditSeriesResource,
};
export {
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
} from "./configurations";

// All non-CRUD routes across every feature, composed into a single element.
export const AppCustomRoutes = (
  <CustomRoutes>
    {studentCustomRoutes}
    {staffCustomRoutes}
    {purchasesSalesCustomRoutes}
    {lunchesCustomRoutes}
    {eBillingCustomRoutes}
    {incomesExpensesCustomRoutes}
    {dailyCashCustomRoutes}
    {enrollmentPaymentsCustomRoutes}
  </CustomRoutes>
);
