import { Create, SimpleForm, TextInput } from "react-admin";

export const WorkPositionsCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="position" label="Cargo" />
    </SimpleForm>
  </Create>
);
