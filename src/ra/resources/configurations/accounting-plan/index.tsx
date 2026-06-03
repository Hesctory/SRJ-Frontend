import { Resource } from "react-admin";
import SavingsIcon from "@mui/icons-material/Savings";
import { AccountingPlanList } from "./AccountingPlanList";
import { AccountingPlanCreate } from "./AccountingPlanCreate";
import { AccountingPlanEdit } from "./AccountingPlanEdit";

export const AccountingPlanResource = (
  <Resource
    name="accounting-plan"
    list={AccountingPlanList}
    create={AccountingPlanCreate}
    edit={AccountingPlanEdit}
    icon={SavingsIcon}
  />
);
