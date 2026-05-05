import { Resource } from "react-admin";
import SchoolIcon from "@mui/icons-material/School";
import { StudentsList } from "./StudentsList";
import { StudentEdit } from "./StudentEdit";

export const StudentsResource = (
  <Resource
    name="students"
    list={StudentsList}
    edit={StudentEdit}
    icon={SchoolIcon}
  />
);
