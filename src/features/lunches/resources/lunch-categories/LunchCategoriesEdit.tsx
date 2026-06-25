import { Edit, SimpleForm, TextInput, required } from "react-admin";
import CRUDToolBar from "@/app/layout/CRUDToolBar";

export const LunchCategoriesEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm toolbar={<CRUDToolBar save delete />}>
      <TextInput
        source="name"
        label="Nombre"
        validate={required()}
        isRequired
      />
    </SimpleForm>
  </Edit>
);
