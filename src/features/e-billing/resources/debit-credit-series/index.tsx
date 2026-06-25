import { EditGuesser, ListGuesser, Resource } from "react-admin";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export const DebitCreditSeriesResource = (
  <Resource
    name="debit-credit-series"
    list={ListGuesser}
    edit={EditGuesser}
    icon={ReceiptLongIcon}
  />
);
