import { Create, NumberInput, SimpleForm, TextInput } from "react-admin";

export const LevelsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nivel" />
            <NumberInput source="orderIndex" label="Orden" />
        </SimpleForm>
    </Create>
);
