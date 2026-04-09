import { Resource } from "react-admin";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { LunchesList } from "./LunchesList";
import { LunchesCreate } from "./LunchesCreate";
import { LunchesEdit } from "./LunchesEdit";

export const LunchesResource = (
    <Resource
        name="lunches"
        list={LunchesList}
        create={LunchesCreate}
        edit={LunchesEdit}
        icon={FastfoodIcon}
    />
);
