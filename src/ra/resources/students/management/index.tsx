import { Resource } from "react-admin";
import SchoolIcon from "@mui/icons-material/School";
import { StudentsList } from "./StudentsList";
import { StudentCreate } from "./StudentCreate";
import { StudentEdit } from "./StudentEdit";

export const StudentsResource = (
    <Resource
        name="students"
        list={StudentsList}
        create={StudentCreate}
        edit={StudentEdit}
        icon={SchoolIcon}
    />
);
