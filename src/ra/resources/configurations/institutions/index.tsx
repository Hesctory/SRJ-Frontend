import { Resource } from "react-admin";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { InstitutionsList } from "./InstitutionsList";
import { InstitutionsEdit } from "./InstitutionsEdit";
import { InstitutionsCreate } from "./InstitutionsCreate";

export const InstitutionsResource = (
    <Resource
        name="institutions"
        list={InstitutionsList}
        edit={InstitutionsEdit}
        create={InstitutionsCreate}
        icon={CorporateFareIcon}
    />
);
