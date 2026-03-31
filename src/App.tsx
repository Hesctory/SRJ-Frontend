import { Admin, CustomRoutes, defaultTheme, EditGuesser, ListGuesser, Resource } from "react-admin";
import { MyLayout } from "./ra/layout/MyLayout";
import { dataProvider } from "./ra/dataProvider";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { createTheme } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import { Route } from "react-router-dom";
import EnrollStudent from "./EnrollMentStudent";

const lightTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: 'light',
    },
});

export const App = () => 
    <Admin theme = {lightTheme} dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} loginPage={CustomLogin} dashboard={Home}>
        <CustomRoutes>
            <Route path="/students/enrollment" element={<EnrollStudent />} />
        </CustomRoutes>
    </Admin>;
