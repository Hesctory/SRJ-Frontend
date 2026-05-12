import { Box } from "@mui/material";
import CRUDToolBar from "../../../layout/CRUDToolBar";
import { EnrollButton } from "../../../CustomButtons/EnrollButton";
import { ViewEnrollmentsButton } from "../../../CustomButtons/ViewEnrollmentsButton";

const StudentEditToolbar = () => (
    <CRUDToolBar save delete>
        <Box display="flex" gap={1}>
            <ViewEnrollmentsButton />
            <EnrollButton />
        </Box>
    </CRUDToolBar>
);

export default StudentEditToolbar;
