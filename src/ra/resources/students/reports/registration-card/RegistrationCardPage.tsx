import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Datagrid,
  Form,
  ListBase,
  TextField,
  TextInput,
  Title,
  useDataProvider,
  useListContext,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import { PDFViewer } from "@react-pdf/renderer";
import AcademicFormSelector from "../../../../../presentation/components/AcademicFormSelector";
import { useAcademicFilterData } from "../../../../../presentation/hooks/useAcademicFilterData";
import {
  RegistrationCardDocument,
  type RegistrationCardContext,
  type RegistrationCardStudent,
} from "./RegistrationCardDocument";

interface GenerateButtonProps {
  onResult: (
    students: RegistrationCardStudent[],
    ctx: RegistrationCardContext,
  ) => void;
}

const GenerateButton = ({ onResult }: GenerateButtonProps) => {
  const dataProvider = useDataProvider();
  const [generating, setGenerating] = useState(false);
  const { handleSubmit } = useFormContext();
  const { selectedIds } = useListContext();

  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });

  const { schoolYears, levels, grades, shifts, sections } =
    useAcademicFilterData(schoolYearId, levelId, gradeId, shiftId);

  const generate = handleSubmit(async () => {
    setGenerating(true);
    try {
      const filter: Record<string, string> = {};
      if (schoolYearId) filter.schoolYearId = String(schoolYearId);
      if (levelId) filter.levelId = String(levelId);
      if (gradeId) filter.gradeId = String(gradeId);
      if (shiftId) filter.shiftId = String(shiftId);
      if (sectionId) filter.sectionId = String(sectionId);
      if (selectedIds.length > 0) filter.studentIds = selectedIds.join(",");

      const { data } = await dataProvider.getList(
        "students-registration-card-report",
        {
          pagination: { page: 1, perPage: 1000 },
          sort: { field: "fullName", order: "ASC" },
          filter,
        },
      );

      onResult(data as RegistrationCardStudent[], {
        schoolYear: schoolYears.find((sy) => sy.id == schoolYearId)?.year,
        level: levels.find((lv) => lv.id == levelId)?.name,
        grade: grades.find((g) => g.id == gradeId)?.name,
        shift: shifts.find((sh) => sh.id == shiftId)?.name,
        section: sections.find((s) => s.id == sectionId)?.section,
      });
    } finally {
      setGenerating(false);
    }
  });

  return (
    <Button
      variant="contained"
      startIcon={
        generating ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <PictureAsPdfIcon />
        )
      }
      onClick={() => generate()}
      disabled={generating}
    >
      Generar Ficha
    </Button>
  );
};

const SelectionResetter = ({ filterKey }: { filterKey: string }) => {
  const { onUnselectItems } = useListContext();
  const unselectRef = useRef(onUnselectItems);
  unselectRef.current = onUnselectItems;

  useEffect(() => {
    unselectRef.current();
  }, [filterKey]);
  return null;
};

interface StudentSelectionListProps {
  filterKey: string;
  onResult: GenerateButtonProps["onResult"];
}

const StudentSelectionList = ({
  filterKey,
  onResult,
}: StudentSelectionListProps) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="subtitle1" gutterBottom>
      Seleccionar estudiantes{" "}
      <Typography component="span" variant="body2" color="text.secondary">
        (sin selección = todos)
      </Typography>
    </Typography>
    <SelectionResetter filterKey={filterKey} />
    <Datagrid bulkActionButtons={<></>} rowClick="toggleSelection">
      <TextField source="dni" label="DNI" />
      <TextField source="fullName" label="Nombre Completo" />
    </Datagrid>
    <Box sx={{ mt: 2 }}>
      <GenerateButton onResult={onResult} />
    </Box>
  </Box>
);

interface RegistrationCardFormProps {
  onResult: GenerateButtonProps["onResult"];
}

const RegistrationCardForm = ({ onResult }: RegistrationCardFormProps) => {
  const schoolYearId = useWatch({ name: "schoolYearId" });
  const levelId = useWatch({ name: "levelId" });
  const gradeId = useWatch({ name: "gradeId" });
  const shiftId = useWatch({ name: "shiftId" });
  const sectionId = useWatch({ name: "sectionId" });
  const dni = useWatch({ name: "dni" });
  const fullName = useWatch({ name: "fullName" });

  const filter = {
    ...(schoolYearId && { schoolYearId }),
    ...(levelId && { levelId }),
    ...(gradeId && { gradeId }),
    ...(shiftId && { shiftId }),
    ...(sectionId && { sectionId }),
    ...(dni && { dni }),
    ...(fullName && { fullName }),
  };

  const filterKey = [
    schoolYearId,
    levelId,
    gradeId,
    shiftId,
    sectionId,
    dni,
    fullName,
  ]
    .filter(Boolean)
    .join("|");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mt: 1,
          "& .MuiFormControl-root": { flex: "1 1 160px", mt: 0, mb: 0 },
        }}
      >
        <AcademicFormSelector required={false} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mt: 2,
          "& .MuiFormControl-root": { flex: "1 1 160px", mt: 0, mb: 0 },
        }}
      >
        <TextInput source="dni" label="DNI" />
        <TextInput source="fullName" label="Nombre" />
      </Box>
      <ListBase
        resource="students"
        filter={filter}
        disableSyncWithLocation
        perPage={200}
      >
        <StudentSelectionList filterKey={filterKey} onResult={onResult} />
      </ListBase>
    </>
  );
};

export const RegistrationCardPage = () => {
  const [pdfStudents, setPdfStudents] = useState<RegistrationCardStudent[]>([]);
  const [pdfContext, setPdfContext] = useState<RegistrationCardContext>({});
  const [pdfOpen, setPdfOpen] = useState(false);

  const handleResult = (
    students: RegistrationCardStudent[],
    ctx: RegistrationCardContext,
  ) => {
    setPdfStudents(students);
    setPdfContext(ctx);
    setPdfOpen(true);
  };

  const pdfDocument = useMemo(
    () => (
      <RegistrationCardDocument students={pdfStudents} context={pdfContext} />
    ),
    [pdfStudents, pdfContext],
  );

  return (
    <>
      <Title title="Reporte: Ficha de Matrícula" />
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ficha de Matrícula
          </Typography>
          <Form>
            <RegistrationCardForm onResult={handleResult} />
          </Form>
        </CardContent>
      </Card>

      <Dialog
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Fichas de Matrícula
          <IconButton onClick={() => setPdfOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: "80vh" }}>
          <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
            {pdfDocument}
          </PDFViewer>
        </DialogContent>
      </Dialog>
    </>
  );
};
