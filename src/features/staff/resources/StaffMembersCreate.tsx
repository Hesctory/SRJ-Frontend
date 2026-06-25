import {
  Create,
  DateInput,
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

export const StaffMembersCreate = () => (
  <Create redirect="list" mutationMode="pessimistic">
    <TabbedForm toolbar={<CRUDToolBar save />}>
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

      <TabbedForm.Tab label="Contrato Inicial">
        <ReferenceInput
          source="contract.institutionId"
          reference="institutions"
        >
          <SelectInput label="Institución" isRequired validate={required()} />
        </ReferenceInput>

        <ReferenceInput source="contract.schoolYearId" reference="school-years">
          <SelectInput
            label="Año Escolar"
            optionText="year"
            isRequired
            validate={required()}
          />
        </ReferenceInput>

        <ReferenceInput
          source="contract.jobPositionId"
          reference="job-positions"
        >
          <SelectInput label="Cargo" isRequired validate={required()} />
        </ReferenceInput>

        <ReferenceInput source="contract.areaId" reference="work-areas">
          <SelectInput label="Área" />
        </ReferenceInput>

        <Box display="flex" gap={2} width="100%">
          <DateInput
            source="contract.startDate"
            label="Fecha de Inicio"
            isRequired
            validate={required()}
          />
          <DateInput source="contract.endDate" label="Fecha de Fin" />
        </Box>

        <NumberInput source="contract.salary" label="Salario" min={0} />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
