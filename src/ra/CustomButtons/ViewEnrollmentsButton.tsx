import { useState } from "react";
import { Button } from "react-admin";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { EnrollmentsDialog } from "../../presentation/components/EnrollmentsDialog";

export const ViewEnrollmentsButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                label="Ver matrículas"
                onClick={() => setOpen(true)}
                size="large"
                sx={{ backgroundColor: "info.main", color: "white", "&:hover": { backgroundColor: "info.dark" } }}
            >
                <ListAltIcon />
            </Button>
            <EnrollmentsDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};
