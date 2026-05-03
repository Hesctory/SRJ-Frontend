import { Edit, NumberInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const LevelsEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="name" label="Nivel" />
            <NumberInput source="orderIndex" label="Orden" />
        </SimpleForm>
    </Edit>
);
