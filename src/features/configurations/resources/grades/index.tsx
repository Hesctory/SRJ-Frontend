import { Resource } from "react-admin";
import GradeIcon from "@mui/icons-material/Grade";
import { GradesList } from "./GradesList";
import { GradesCreate } from "./GradesCreate";
import { GradesEdit } from "./GradesEdit";

export const GradesResource = (
  <Resource
    name="grades"
    list={GradesList}
    create={GradesCreate}
    edit={GradesEdit}
    icon={GradeIcon}
  />
);
