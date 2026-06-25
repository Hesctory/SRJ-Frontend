import { Create, SimpleForm, TextInput } from "react-admin";

export const WorkAreasCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Área" />
    </SimpleForm>
  </Create>
);
