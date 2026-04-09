import { Edit, SimpleForm, TextInput } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const SchoolYearsEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <TextInput source="schoolYear" label="Año Escolar" />
            <TextInput source="date" label="Fecha de Inicio" />
            <TextInput source="endDate" label="Fecha de Fin" />
        </SimpleForm>
    </Edit>
);
