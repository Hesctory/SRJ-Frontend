import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
} from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const CostsEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <ReferenceInput source="levelId" reference="levels">
        <SelectInput optionText="level" label="Nivel" />
      </ReferenceInput>
      <ReferenceInput source="shift" reference="shifts">
        <SelectInput optionText="name" optionValue="name" label="Turno" />
      </ReferenceInput>
      <NumberInput source="inscription" label="Inscripción" min={0} />
      <NumberInput source="enrollment" label="Matrícula" min={0} />
      <NumberInput source="monthly" label="Mensualidad" min={0} />
      <NumberInput source="disscountTypeId" label="Tipo de Descuento" min={1} />
      <ReferenceInput source="schoolYearId" reference="school-years">
        <SelectInput optionText="schoolYear" label="Año Escolar" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
