import { Resource } from "react-admin";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { SchoolYearsList } from "./SchoolYearsList";
import { SchoolYearsEdit } from "./SchoolYearsEdit";
import { SchoolYearsCreate } from "./SchoolYearsCreate";

export const SchoolYearsResource = (
    <Resource
        name="school-years"
        list={SchoolYearsList}
        edit={SchoolYearsEdit}
        create={SchoolYearsCreate}
        icon={CalendarTodayIcon}
    />
);
