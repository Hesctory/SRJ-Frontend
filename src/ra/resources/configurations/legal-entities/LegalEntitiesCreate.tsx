import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const LegalEntitiesCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="ruc" label="RUC" />
            <ReferenceInput source="validFrom" reference="school-years">
                <SelectInput optionText="schoolYear" label="Vigente desde" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
