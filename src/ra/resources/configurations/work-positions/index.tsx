import { Resource } from "react-admin";
import WorkIcon from "@mui/icons-material/Work";
import { WorkPositionsList } from "./WorkPositionsList";
import { WorkPositionsCreate } from "./WorkPositionsCreate";
import { WorkPositionsEdit } from "./WorkPositionsEdit";

export const WorkPositionsResource = (
  <Resource
    name="work-positions"
    list={WorkPositionsList}
    create={WorkPositionsCreate}
    edit={WorkPositionsEdit}
    icon={WorkIcon}
  />
);
