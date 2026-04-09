import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const LevelsEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="level" label="Nivel" />
            <ReferenceInput source="legalEntityId" reference="legal-entities">
                <SelectInput optionText="name" label="Entidad Legal" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
