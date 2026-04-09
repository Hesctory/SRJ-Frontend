import { Admin, CustomRoutes, defaultTheme } from "react-admin";
import { MyLayout } from "./ra/layout/MyLayout";
import { dataProvider } from "./ra/dataProvider";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { PlaceholderPage } from "./presentation/pages/PlaceholderPage";
import { createTheme } from "@mui/material";
import { Route } from "react-router-dom";
import {
    StaffResource,
    StudentsResource,
    PublishersResource,
    ProductsResource,
    SchoolYearsResource,
    AccountingPlansResource,
    LegalEntitiesResource,
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
        mode: 'light',
    },
});

export const App = () =>
    <Admin theme={lightTheme} dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} loginPage={CustomLogin} dashboard={Home}>
        {StaffResource}
        {StudentsResource}
        {PublishersResource}
        {ProductsResource}
        {SchoolYearsResource}
        {AccountingPlansResource}
        {LegalEntitiesResource}
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

        <CustomRoutes>
            {/* Students */}
            <Route path="/students/reports" element={<PlaceholderPage title="Reportes de Estudiantes" />} />
            {/* Staff */}
            <Route path="/staff/reports" element={<PlaceholderPage title="Reportes de Staff" />} />
            {/* Purchases & Sales */}
            <Route path="/purchases-sales/economic-management" element={<PlaceholderPage title="Gestión Económica" />} />
            <Route path="/purchases-sales/payment-tracking" element={<PlaceholderPage title="Pagos" />} />
            <Route path="/purchases-sales/pension-vouchers-reconciliation" element={<PlaceholderPage title="Cuadre de Pagos" />} />
            <Route path="/purchases-sales/reports" element={<PlaceholderPage title="Reportes de Compras y Ventas" />} />
            {/* E-Billing */}
            <Route path="/e-billing/sunat-summary" element={<PlaceholderPage title="SUNAT" />} />
            <Route path="/e-billing/reports" element={<PlaceholderPage title="Reportes de Facturación" />} />
            {/* Incomes & Expenses */}
            <Route path="/incomes-expenses/economic-management" element={<PlaceholderPage title="Gestión Económica" />} />
            <Route path="/incomes-expenses/payments-debts" element={<PlaceholderPage title="Pagos y Deudas" />} />
            <Route path="/incomes-expenses/vouchers-receipts" element={<PlaceholderPage title="Boletas y Recibos" />} />
            <Route path="/incomes-expenses/reports" element={<PlaceholderPage title="Reportes de Ingresos y Egresos" />} />
            <Route path="/incomes-expenses/pension-receipts-reconciliation" element={<PlaceholderPage title="Cuadre Nro Recibos Pension" />} />
            {/* Lunches */}
            <Route path="/lunches/assignment" element={<PlaceholderPage title="Asignación de Loncheras" />} />
            <Route path="/lunches/queries" element={<PlaceholderPage title="Consultas de Loncheras" />} />
            <Route path="/lunches/reports" element={<PlaceholderPage title="Reportes de Loncheras" />} />
            <Route path="/lunches/economic-management" element={<PlaceholderPage title="Gestión Económica de Loncheras" />} />
            <Route path="/lunches/renditions" element={<PlaceholderPage title="Rendiciones" />} />
            {/* Daily Cash */}
            <Route path="/daily-cash" element={<PlaceholderPage title="Caja Diaria" />} />
        </CustomRoutes>
    </Admin>;
