import { Edit, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const CategoriesEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <TextInput source="category" label="Categoría" />
    </SimpleForm>
  </Edit>
);
