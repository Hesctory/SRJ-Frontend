import { Create, SimpleForm, TextInput } from "react-admin";

export const JobPositionsCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Cargo" />
    </SimpleForm>
  </Create>
);
