import { Admin, defaultTheme, Resource } from "react-admin";
import { MyLayout } from "./ra/layout/MyLayout";
import { dataProvider } from "./ra/dataProvider";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { createTheme } from "@mui/material";
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
import { BrowserRouter } from 'react-router-dom';

const SIDEBAR_NAVY = "#0a1638";

const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#1a2f6e",
    },
    secondary: {
      main: "#4a6fa5",
    },
    background: {
      default: "#e5e3d8",
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  components: {
    ...defaultTheme.components,
    // Unified navy "shell": the sidebar shares the appbar's navy so the top bar
    // and left rail read as one continuous L-shaped frame around the content.
    RaSidebar: {
      styleOverrides: {
        root: {
          "& .RaSidebar-paper": { backgroundColor: SIDEBAR_NAVY },
          "& .RaSidebar-fixed": { backgroundColor: SIDEBAR_NAVY },
        },
      },
    },
    RaMenu: {
      styleOverrides: {
        root: { backgroundColor: "transparent" },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.72)",
          borderLeft: "3px solid transparent",
          "& .RaMenuItemLink-icon": { color: "inherit" },
          "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          "&.RaMenuItemLink-active": {
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.12)",
            borderLeft: "3px solid #4a6fa5",
            "& .RaMenuItemLink-icon": { color: "#fff" },
          },
        },
      },
    },
    // Drop the appbar shadow so the navy top bar blends into the navy rail.
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export const App = () => (
  <BrowserRouter>
    <Admin
      requireAuth
      theme={lightTheme}
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
