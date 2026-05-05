import { Resource } from "react-admin";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { SectionsList } from "./SectionsList";
import { SectionsCreate } from "./SectionsCreate";
import { SectionsEdit } from "./SectionsEdit";

export const SectionsResource = (
  <Resource
    name="sections"
    list={SectionsList}
    create={SectionsCreate}
    edit={SectionsEdit}
    icon={ViewModuleIcon}
  />
);
