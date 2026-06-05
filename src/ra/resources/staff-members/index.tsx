import { Resource } from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import { StaffMembersList } from "./StaffMembersList";
import { StaffMembersEdit } from "./StaffMembersEdit";
import { StaffMembersCreate } from "./StaffMembersCreate";

export const StaffMembersResource = (
  <Resource
    name="staff-members"
    list={StaffMembersList}
    edit={StaffMembersEdit}
    create={StaffMembersCreate}
    icon={GroupIcon}
  />
);
