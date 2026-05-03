import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const InstitutionsEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="ruc" label="RUC" />
            <ReferenceInput source="rucStateId" reference="ruc-states">
                <SelectInput optionText="name" label="Estado RUC" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
