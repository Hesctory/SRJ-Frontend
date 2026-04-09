import { Resource } from "react-admin";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { PublishersList } from "./PublishersList";
import { PublishersEdit } from "./PublishersEdit";
import { PublishersCreate } from "./PublishersCreate";

export const PublishersResource = (
    <Resource
        name="publishers"
        list={PublishersList}
        edit={PublishersEdit}
        create={PublishersCreate}
        icon={MenuBookIcon}
    />
);
