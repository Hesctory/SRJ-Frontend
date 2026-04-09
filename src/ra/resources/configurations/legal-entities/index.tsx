import { Resource } from "react-admin";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { LegalEntitiesList } from "./LegalEntitiesList";
import { LegalEntitiesEdit } from "./LegalEntitiesEdit";
import { LegalEntitiesCreate } from "./LegalEntitiesCreate";

export const LegalEntitiesResource = (
    <Resource
        name="legal-entities"
        list={LegalEntitiesList}
        edit={LegalEntitiesEdit}
        create={LegalEntitiesCreate}
        icon={CorporateFareIcon}
    />
);
