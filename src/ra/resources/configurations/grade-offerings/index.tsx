import { Resource } from "react-admin";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { GradeOfferingsList } from "./GradeOfferingsList";
import { GradeOfferingsCreate } from "./GradeOfferingsCreate";
import { GradeOfferingsEdit } from "./GradeOfferingsEdit";

export const GradeOfferingsResource = (
    <Resource
        name="grade-offerings"
        list={GradeOfferingsList}
        create={GradeOfferingsCreate}
        edit={GradeOfferingsEdit}
        icon={ViewModuleIcon}
    />
);
