import {
  DateInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";
import { Box } from "@mui/material";

const EmploymentContractFormInputs = () => (
  <>
    <ReferenceInput source="institutionId" reference="institutions">
      <SelectInput
        label="Institución"
        isRequired
        validate={required()}
        fullWidth
      />
    </ReferenceInput>

    <ReferenceInput source="schoolYearId" reference="school-years">
      <SelectInput
        label="Año Escolar"
        optionText="year"
        isRequired
        validate={required()}
        fullWidth
      />
    </ReferenceInput>

    <ReferenceInput source="jobPositionId" reference="job-positions">
      <SelectInput
        label="Cargo"
        isRequired
        validate={required()}
        fullWidth
      />
    </ReferenceInput>

    <ReferenceInput source="areaId" reference="work-areas">
      <SelectInput label="Área" fullWidth />
    </ReferenceInput>

    <Box display="flex" gap={2} width="100%">
      <DateInput
        source="startDate"
        label="Fecha de Inicio"
        isRequired
        validate={required()}
      />
      <DateInput source="endDate" label="Fecha de Fin" />
    </Box>

    <NumberInput source="salary" label="Salario" min={0} />
  </>
);

export default EmploymentContractFormInputs;
