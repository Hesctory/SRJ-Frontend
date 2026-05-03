import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const GradesCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Grado" />
            <NumberInput source="year" label="Año" />
            <ReferenceInput source="levelId" reference="levels">
                <SelectInput optionText="name" label="Nivel" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
