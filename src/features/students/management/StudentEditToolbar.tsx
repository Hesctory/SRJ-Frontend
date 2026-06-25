import { Box } from "@mui/material";
import CRUDToolBar from "@/app/layout/CRUDToolBar";
import { EnrollButton } from "@/features/students/buttons/EnrollButton";
import { ViewEnrollmentsButton } from "@/features/students/buttons/ViewEnrollmentsButton";

const StudentEditToolbar = () => (
  <CRUDToolBar save delete>
    <Box display="flex" gap={1}>
      <ViewEnrollmentsButton />
      <EnrollButton />
    </Box>
  </CRUDToolBar>
);

export default StudentEditToolbar;
