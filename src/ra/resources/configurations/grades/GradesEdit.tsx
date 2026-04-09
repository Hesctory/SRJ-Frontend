import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const GradesEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="grade" label="Grado" />
            <ReferenceInput source="levelId" reference="levels">
                <SelectInput optionText="level" label="Nivel" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
