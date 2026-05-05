import { useState } from "react";
import { Button } from "react-admin";
import SchoolIcon from "@mui/icons-material/School";
import { useFormContext } from "react-hook-form";
import { EnrollmentDialog } from "../../presentation/components/EnrollmentDialog";

export const EnrollButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentDraft, setStudentDraft] = useState<Record<string, unknown>>({});
  const { trigger, getValues } = useFormContext();

  const handleClick = async () => {
    const valid = await trigger();
    if (valid) {
      setStudentDraft(getValues());
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Button
        label="Matricular"
        onClick={handleClick}
        size="large"
        sx={{
          backgroundColor: "success.main",
          color: "white",
          "&:hover": { backgroundColor: "success.dark" },
        }}
      >
        <SchoolIcon />
      </Button>

      {dialogOpen && (
        <EnrollmentDialog
          mode="create"
          studentDraft={studentDraft}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};
