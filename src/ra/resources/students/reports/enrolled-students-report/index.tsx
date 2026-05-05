import { EditGuesser, Resource } from "react-admin";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { EnrolledStudentsReportList } from "./EnrolledStudentsReportList";

export const EnrolledStudentsReportResource = (
  <Resource
    name="enrolled-students-report"
    list={EnrolledStudentsReportList}
    edit={EditGuesser}
    icon={AssignmentIndIcon}
  />
);
