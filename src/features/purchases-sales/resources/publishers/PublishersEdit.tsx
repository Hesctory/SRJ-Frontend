import { Edit, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "@/shared/buttons/BackToListButton";

export const PublishersEdit = () => (
  <Edit actions={<BackToListButton />}>
    <SimpleForm>
      <TextInput source="description" label="Descripción" />
    </SimpleForm>
  </Edit>
);
