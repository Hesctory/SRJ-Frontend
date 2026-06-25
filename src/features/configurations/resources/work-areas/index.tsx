import { Resource } from "react-admin";
import CategoryIcon from "@mui/icons-material/Category";
import { WorkAreasList } from "./WorkAreasList";
import { WorkAreasCreate } from "./WorkAreasCreate";
import { WorkAreasEdit } from "./WorkAreasEdit";

export const WorkAreasResource = (
  <Resource
    name="work-areas"
    list={WorkAreasList}
    create={WorkAreasCreate}
    edit={WorkAreasEdit}
    icon={CategoryIcon}
  />
);
