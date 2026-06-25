import { Edit, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "@/shared/buttons/BackToListButton";

export const JobPositionsEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <TextInput source="name" label="Cargo" />
    </SimpleForm>
  </Edit>
);
