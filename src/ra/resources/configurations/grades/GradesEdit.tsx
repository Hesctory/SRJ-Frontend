import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";
import CRUDToolBar from "../../../layout/CRUDToolBar";

export const GradesEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm toolbar={<CRUDToolBar save delete />}>
            <TextInput source="name" label="Grado" />
            <NumberInput source="year" label="Año" />
            <ReferenceInput source="levelId" reference="levels">
                <SelectInput optionText="name" label="Nivel" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
