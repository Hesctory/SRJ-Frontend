import { useState } from "react";
import {
  BooleanInput,
  Button,
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  required,
  useDataProvider,
  useNotify,
  useRedirect,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CRUDToolBar from "../../../layout/CRUDToolBar";
import LocationFormSelector from "../../../../presentation/components/LocationFormSelector";
import SecondLanguagesFormSelector from "../../../../presentation/components/SecondLanguagesFormSelector";
import DisabilityForm from "../../../../presentation/components/DisabilityForm";
import MultipleFamiliarsForm from "../../../../presentation/components/MultipleFamiliarsForm";
import EnrollmentFormInputs from "../../../../presentation/components/EnrollmentFormInputs";

const ConfirmCreateStudentButton = () => {
  const [open, setOpen] = useState(false);
  const { trigger, getValues } = useFormContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();

  const handleClick = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      await dataProvider.create("students", { data: getValues() });
      notify("Estudiante creado exitosamente", { type: "success" });
      redirect("list", "students");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      notify(`Error al crear estudiante: ${message}`, { type: "error" });
    } finally {
      setOpen(false);
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar creación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Confirmar la creación del estudiante y su matrícula?
          </Typography>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={() => setOpen(false)}>Cancelar</MuiButton>
          <MuiButton
            variant="contained"
            color="success"
            onClick={handleConfirm}
          >
            Confirmar
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const StudentCreate = () => {
  return (
    <Create
      mutationMode="pessimistic"
      title={
        <span
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Crear Estudiante
        </span>
      }
    >
      <TabbedForm
        defaultValues={{ familiars: [] }}
        toolbar={
          <CRUDToolBar>
            <ConfirmCreateStudentButton />
          </CRUDToolBar>
        }
      >
        <TabbedForm.Tab label="Datos Personales">
          <Box display="flex" gap={2} width="100%">
            <TextInput
              source="names"
              label="Nombres"
              isRequired
              validate={required()}
            />
            <TextInput
              source="paternalLastname"
              label="Apellido Paterno"
              isRequired
              validate={required()}
            />
            <TextInput
              source="maternalLastname"
              label="Apellido Materno"
              isRequired
              validate={required()}
            />
          </Box>

          <ReferenceInput source="genderId" reference="genders">
            <SelectInput label="Sexo" isRequired validate={required()} />
          </ReferenceInput>

          <Box display="flex" gap={2} width="100%">
            <ReferenceInput source="documentTypeId" reference="document-types">
              <SelectInput
                label="Tipo de Documento"
                isRequired
                validate={required()}
              />
            </ReferenceInput>
            <TextInput
              source="idDocumentNumber"
              label="Número de Documento"
              isRequired
              validate={required()}
            />
          </Box>

          <ReferenceInput
            source="ethnicSelfIdentificationId"
            reference="ethnic-self-identifications"
          >
            <SelectInput label="Autoidentificación Étnica" />
          </ReferenceInput>
          <Box display="flex" gap={2} width="100%" alignItems="flex-start">
            <ReferenceInput source="nativeLanguageId" reference="languages">
              <SelectInput
                label="Lengua Materna"
                isRequired
                validate={required()}
              />
            </ReferenceInput>
            <SecondLanguagesFormSelector />
          </Box>

          <ReferenceInput source="religionId" reference="religions">
            <SelectInput label="Religión" />
          </ReferenceInput>
          <ReferenceInput source="civilStateId" reference="civil-states">
            <SelectInput label="Estado Civil" />
          </ReferenceInput>
          <NumberInput source="siblings" label="Número de Hermanos" min={0} />

          <Typography variant="caption" color="text.secondary">
            Solo si el estudiante es mayor de edad:
          </Typography>
          <Box display="flex" gap={2} width="100%">
            <TextInput source="cellphone" label="Celular" />
            <TextInput source="landlinePhone" label="Teléfono fijo" />
            <TextInput source="email" label="Correo electrónico" />
          </Box>
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Datos de Nacimiento">
          <DateInput
            source="birthDate"
            label="Fecha de Nacimiento"
            isRequired
            validate={required()}
          />
          <ReferenceInput
            source="childbirthTypeId"
            reference="childbirth-types"
          >
            <SelectInput label="Tipo de Parto" />
          </ReferenceInput>
          <Box display="flex" gap={2} width="100%">
            <LocationFormSelector sourcePrefix="birthLocation" />
          </Box>
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Domicilio">
          <TextInput
            source="address"
            label="Dirección"
            isRequired
            validate={required()}
          />
          <Box display="flex" gap={2} width="100%">
            <LocationFormSelector sourcePrefix="addressLocation" />
          </Box>
          <BooleanInput
            source="hasElectronicDevices"
            label="Cuenta con dispositivos electrónicos"
          />
          <BooleanInput
            source="hasInternetAccess"
            label="Cuenta con acceso a internet"
          />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Apoderados">
          <MultipleFamiliarsForm />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Discapacidad">
          <DisabilityForm />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Matrícula">
          <EnrollmentFormInputs sourcePrefix="enrollment" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};
