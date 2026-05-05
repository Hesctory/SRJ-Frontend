import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const ClassroomsEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <TextInput source="name" label="Nombre" />
      <NumberInput source="capacity" label="Capacidad" min={1} />
    </SimpleForm>
  </Edit>
);
