import React, { useState } from "react";
import {
  Dialog,
  Button as MuiButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  ReferenceInput,
  SelectInput,
  SimpleForm,
  useNotify,
  useRedirect,
  useDataProvider,
  required,
} from "react-admin";
import { dataProvider as dpType, SchoolYear } from "../../ra/dataProvider";

type EnrollmentDialogProps =
  | {
      mode: "create";
      studentDraft: Record<string, unknown>;
      onClose: () => void;
    }
  | {
      mode: "reenroll";
      studentId: number | string;
      eligibleYears: SchoolYear[];
      onClose: () => void;
      onSuccess: () => void;
    };

export const EnrollmentDialog: React.FC<EnrollmentDialogProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const redirect = useRedirect();
  const dp = useDataProvider<typeof dpType>();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (props.mode === "create") {
        const result = await dp.enrollStudent({
          student: props.studentDraft,
          enrollment: formData,
        });
        notify("Matrícula registrada exitosamente", { type: "success" });
        props.onClose();
        redirect("edit", "students", result.studentId);
      } else {
        await dp.reenrollStudent(props.studentId, formData);
        notify("Rematrícula registrada exitosamente", { type: "success" });
        props.onClose();
        props.onSuccess();
      }
    } catch (error: unknown) {
      const err = error as { body?: { code?: string }; message?: string };
      const code = err?.body?.code;
      if (code === "DUPLICATE_DOCUMENT") {
        notify("Ya existe un estudiante con ese número de documento", {
          type: "error",
        });
      } else if (code === "YEAR_ALREADY_ENROLLED") {
        notify("El estudiante ya está matriculado en ese año escolar", {
          type: "error",
        });
      } else {
        notify(`Error: ${err?.message ?? "Error desconocido"}`, {
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={props.onClose} maxWidth="sm" fullWidth>
      <SimpleForm onSubmit={handleSubmit} toolbar={false}>
        <Typography variant="h6" gutterBottom>
          {props.mode === "create"
            ? "Matricular Estudiante"
            : "Rematricular Estudiante"}
        </Typography>

        {props.mode === "reenroll" ? (
          <SelectInput
            source="schoolYearId"
            label="Año Escolar"
            choices={props.eligibleYears}
            validate={required()}
            fullWidth
          />
        ) : (
          <ReferenceInput source="schoolYearId" reference="school-years">
            <SelectInput label="Año Escolar" validate={required()} fullWidth />
          </ReferenceInput>
        )}

        <ReferenceInput source="gradeOfferingId" reference="grade-offerings">
          <SelectInput
            label="Oferta de Grado"
            validate={required()}
            fullWidth
          />
        </ReferenceInput>

        <ReferenceInput source="sectionId" reference="sections">
          <SelectInput label="Sección" validate={required()} fullWidth />
        </ReferenceInput>

        <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
          <MuiButton onClick={props.onClose} disabled={loading}>
            Cancelar
          </MuiButton>
          <MuiButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
          >
            Confirmar Matrícula
          </MuiButton>
        </Box>
      </SimpleForm>
    </Dialog>
  );
};
