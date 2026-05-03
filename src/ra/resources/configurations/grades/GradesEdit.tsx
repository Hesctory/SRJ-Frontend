import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const GradesEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="name" label="Grado" />
            <NumberInput source="year" label="Año" />
            <ReferenceInput source="levelId" reference="levels">
                <SelectInput optionText="name" label="Nivel" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
