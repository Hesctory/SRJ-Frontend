import { Resource } from "react-admin";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { LevelsList } from "./LevelsList";
import { LevelsCreate } from "./LevelsCreate";
import { LevelsEdit } from "./LevelsEdit";

export const LevelsResource = (
    <Resource
        name="levels"
        list={LevelsList}
        create={LevelsCreate}
        edit={LevelsEdit}
        icon={AccountTreeIcon}
    />
);
