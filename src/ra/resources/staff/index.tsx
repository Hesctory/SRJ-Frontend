import { Resource } from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import { StaffList } from "./StaffList";
import { StaffEdit } from "./StaffEdit";
import { StaffCreate } from "./StaffCreate";

export const StaffResource = (
    <Resource
        name="staff"
        list={StaffList}
        edit={StaffEdit}
        create={StaffCreate}
        icon={GroupIcon}
    />
);
