import { Resource } from "react-admin";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { ClassroomsList } from "./ClassroomsList";
import { ClassroomsCreate } from "./ClassroomsCreate";
import { ClassroomsEdit } from "./ClassroomsEdit";

export const ClassroomsResource = (
  <Resource
    name="classrooms"
    list={ClassroomsList}
    create={ClassroomsCreate}
    edit={ClassroomsEdit}
    icon={MeetingRoomIcon}
  />
);
