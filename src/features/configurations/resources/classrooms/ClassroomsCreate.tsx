import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

export const ClassroomsCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <NumberInput source="capacity" label="Capacidad" min={1} />
    </SimpleForm>
  </Create>
);
