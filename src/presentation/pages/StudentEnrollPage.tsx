import { useForm, FormProvider } from "react-hook-form";
import {
  BooleanInput,
  DateInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import CRUDToolBar from "../../ra/layout/CRUDToolBar";
import { EnrollButton } from "../../ra/CustomButtons/EnrollButton";
import { Box, Typography } from "@mui/material";
import LocationFormSelector from "../components/LocationFormSelector";
import SecondLanguagesFormSelector from "../components/SecondLanguagesFormSelector";
import DisabilityForm from "../components/DisabilityForm";
import MultipleFamiliarsForm from "../components/MultipleFamiliarsForm";

export const StudentEnrollPage = () => {
  const methods = useForm({
    defaultValues: { familiars: [] },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => {}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Nuevo Estudiante
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Datos Personales</Typography>
          <Box display="flex" gap={2} width="100%">
            <TextInput source="names" label="Nombres" required />
            <TextInput
              source="paternalLastname"
              label="Apellido Paterno"
              required
            />
            <TextInput
              source="maternalLastname"
              label="Apellido Materno"
              required
            />
          </Box>

          <ReferenceInput source="genderId" reference="genders">
            <SelectInput label="Sexo" required />
          </ReferenceInput>

          <Box display="flex" gap={2} width="100%">
            <ReferenceInput source="documentTypeId" reference="document-types">
              <SelectInput label="Tipo de Documento" required />
            </ReferenceInput>
            <TextInput
              source="idDocumentNumber"
              label="Número de Documento"
              required
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
              <SelectInput label="Lengua Materna" required />
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

          <Typography variant="h6" sx={{ mt: 2 }}>
            Datos de Nacimiento
          </Typography>
          <DateInput source="birthDate" label="Fecha de Nacimiento" required />
          <ReferenceInput
            source="childbirthTypeId"
            reference="childbirth-types"
          >
            <SelectInput label="Tipo de Parto" />
          </ReferenceInput>
          <Box display="flex" gap={2} width="100%">
            <LocationFormSelector sourcePrefix="birthLocation" />
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Domicilio
          </Typography>
          <TextInput source="address" label="Dirección" required />
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

          <Typography variant="h6" sx={{ mt: 2 }}>
            Apoderados
          </Typography>
          <MultipleFamiliarsForm />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Discapacidad
          </Typography>
          <DisabilityForm />
        </Box>

        <CRUDToolBar resource="students">
          <EnrollButton />
        </CRUDToolBar>
      </form>
    </FormProvider>
  );
};
