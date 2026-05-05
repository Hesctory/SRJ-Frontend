import {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const LunchesEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <TextInput source="lunch" label="Almuerzo" />
      <ReferenceInput source="categoryId" reference="categories">
        <SelectInput optionText="category" label="Categoría" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
