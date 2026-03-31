import { Admin, defaultTheme, EditGuesser, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import UsersCreate from "./users/users-create";
import UsersList from "./users/usersList";
import PersonIcon from "@mui/icons-material/Person";
import authProvider from "./authProvider";
import CustomLogin from "./presentation/pages/CustomLogin";
import { Home } from "./presentation/pages/Home";
import { createTheme } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const lightTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: 'light',
    },
});
export const App = () => 
    <Admin theme = {lightTheme} dataProvider={dataProvider} authProvider={authProvider} layout={Layout} loginPage={CustomLogin} dashboard={Home}>
        <Resource icon = {SchoolIcon} name="students" list={ListGuesser} edit = {EditGuesser} />
    </Admin>;
