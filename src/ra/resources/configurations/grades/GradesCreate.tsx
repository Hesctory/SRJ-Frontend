import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const GradesCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="grade" label="Grado" />
            <ReferenceInput source="levelId" reference="levels">
                <SelectInput optionText="level" label="Nivel" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
