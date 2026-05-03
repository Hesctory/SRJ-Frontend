import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const InstitutionsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="ruc" label="RUC" />
            <ReferenceInput source="rucStateId" reference="ruc-states">
                <SelectInput optionText="name" label="Estado RUC" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
