import { Resource } from "react-admin";
import PaymentIcon from "@mui/icons-material/Payment";
import { EnrollmentPaymentsList } from "./EnrollmentPaymentsList";
import { EnrollmentPaymentsEdit } from "./EnrollmentPaymentsEdit";

export const EnrollmentPaymentsResource = (
  <Resource
    name="enrollment-payments"
    list={EnrollmentPaymentsList}
    edit={EnrollmentPaymentsEdit}
    icon={PaymentIcon}
  />
);
