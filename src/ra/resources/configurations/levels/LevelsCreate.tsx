import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const LevelsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="level" label="Nivel" />
            <ReferenceInput source="legalEntityId" reference="legal-entities">
                <SelectInput optionText="name" label="Entidad Legal" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
