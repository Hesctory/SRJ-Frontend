import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import {
  Form,
  useDataProvider,
  useNotify,
  useRedirect,
  Identifier,
} from "react-admin";
import EnrollmentFormInputs from "./EnrollmentFormInputs";

interface EnrollDialogProps {
  open: boolean;
  onClose: () => void;
  studentData: Record<string, unknown> | null;
  studentId: Identifier | null;
}

export const EnrollDialog = ({
  open,
  onClose,
  studentData,
  studentId,
}: EnrollDialogProps) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSubmit = async (enrollmentData: Record<string, unknown>) => {
    try {
      if (studentId) {
        const payload = { studentId: studentId, ...enrollmentData };
        console.log("POST /enrollments payload:", payload);
        await dataProvider.create("enrollments", { data: payload });
      } else if (studentData) {
        const payload = { ...studentData, enrollment: enrollmentData };
        console.log("POST /students payload:", payload);
        await dataProvider.create("students", { data: payload });
      }
      notify("Estudiante matriculado exitosamente", { type: "success" });
      redirect("list", "students");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      notify(`Error al matricular el estudiante: ${message}`, {
        type: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Form onSubmit={handleSubmit}>
        <DialogTitle>Matricular Estudiante</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <EnrollmentFormInputs />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="success" type="submit">
            Matricular
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
