import {
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
  required,
} from "react-admin";
import { Box } from "@mui/material";
import CRUDToolBar from "@/app/layout/CRUDToolBar";
import LocationFormSelector from "@/shared/components/LocationFormSelector";
import { ViewEmploymentContractsButton } from "@/features/staff/buttons/ViewEmploymentContractsButton";

export const StaffMembersEdit = () => (
  <Edit mutationMode="pessimistic">
    <TabbedForm
      toolbar={
        <CRUDToolBar save delete>
          <ViewEmploymentContractsButton />
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

        <DateInput
          source="birthDate"
          label="Fecha de Nacimiento"
          isRequired
          validate={required()}
        />

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

        <ReferenceInput source="civilStateId" reference="civil-states">
          <SelectInput label="Estado Civil" />
        </ReferenceInput>

        <Box display="flex" gap={2} width="100%">
          <TextInput source="cellPhone" label="Celular" />
          <TextInput source="landlinePhone" label="Teléfono Fijo" />
          <TextInput source="email" label="Correo Electrónico" type="email" />
        </Box>
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Domicilio">
        <TextInput source="address" label="Dirección" fullWidth />
        <Box display="flex" gap={2} width="100%">
          <LocationFormSelector sourcePrefix="addressLocation" />
        </Box>
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Datos Profesionales">
        <ReferenceInput
          source="levelOfEducationId"
          reference="level-of-educations"
        >
          <SelectInput label="Nivel de Educación" />
        </ReferenceInput>
        <TextInput source="professionalTitle" label="Título Profesional" />
        <TextInput source="employeeCode" label="Código de Empleado" />
        <TextInput source="previousInstitution" label="Institución Anterior" />
        <TextInput
          source="comment"
          label="Comentario"
          multiline
          rows={3}
          fullWidth
        />
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Datos del Cónyuge">
        <TextInput source="spouseName" label="Nombre del Cónyuge" />
        <TextInput
          source="spouseDocumentNumber"
          label="Documento del Cónyuge"
        />
        <TextInput source="spouseOccupation" label="Ocupación del Cónyuge" />
        <NumberInput
          source="numberOfChildren"
          label="Número de Hijos"
          min={0}
        />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
