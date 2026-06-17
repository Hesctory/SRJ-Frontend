import { Create, SimpleForm, TextInput, required } from "react-admin";
import CRUDToolBar from "../../../layout/CRUDToolBar";

export const LunchCategoriesCreate = () => (
  <Create redirect="list" mutationMode="pessimistic">
    <SimpleForm toolbar={<CRUDToolBar save />}>
      <TextInput
        source="name"
        label="Nombre"
        validate={required()}
        isRequired
      />
    </SimpleForm>
  </Create>
);
