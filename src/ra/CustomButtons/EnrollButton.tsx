import { Button } from "react-admin";
import SchoolIcon from "@mui/icons-material/School";

export const EnrollButton = () => (
    <Button
        label="Matricular"
        onClick={() => alert("Matriculando estudiante")}
        size="large"
        sx={{ backgroundColor: 'success.main', color: 'white', '&:hover': { backgroundColor: 'success.dark' } }}
    >
        <SchoolIcon />
    </Button>
);
