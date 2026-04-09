import { EditGuesser, ListGuesser, Resource } from "react-admin";
import SavingsIcon from "@mui/icons-material/Savings";

export const AccountingPlansResource = (
    <Resource
        name="accounting-plans"
        list={ListGuesser}
        edit={EditGuesser}
        icon={SavingsIcon}
    />
);
