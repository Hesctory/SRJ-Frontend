import { Create, SimpleForm, TextInput } from "react-admin";

export const PublishersCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="description" label="Descripción" />
    </SimpleForm>
  </Create>
);
