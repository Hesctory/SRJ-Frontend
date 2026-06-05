import { Resource } from "react-admin";
import WorkIcon from "@mui/icons-material/Work";
import { JobPositionsList } from "./JobPositionsList";
import { JobPositionsCreate } from "./JobPositionsCreate";
import { JobPositionsEdit } from "./JobPositionsEdit";

export const JobPositionsResource = (
  <Resource
    name="job-positions"
    list={JobPositionsList}
    create={JobPositionsCreate}
    edit={JobPositionsEdit}
    icon={WorkIcon}
  />
);
