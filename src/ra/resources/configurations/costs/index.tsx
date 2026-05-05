import { Resource } from "react-admin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { CostsList } from "./CostsList";
import { CostsCreate } from "./CostsCreate";
import { CostsEdit } from "./CostsEdit";

export const CostsResource = (
  <Resource
    name="costs"
    list={CostsList}
    create={CostsCreate}
    edit={CostsEdit}
    icon={AttachMoneyIcon}
  />
);
