import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const LegalEntitiesEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="name" label="Nombre" />
            <TextInput source="ruc" label="RUC" />
            <ReferenceInput source="validFrom" reference="school-years">
                <SelectInput optionText="schoolYear" label="Vigente desde" />
            </ReferenceInput>
            <ReferenceInput source="validTo" reference="school-years" allowEmpty>
                <SelectInput optionText="schoolYear" label="Vigente hasta" emptyText="—" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
