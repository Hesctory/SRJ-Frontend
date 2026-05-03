import { BooleanInput, DateInput, Edit, NumberInput, SimpleForm } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";

export const SchoolYearsEdit = () => (
    <Edit actions={<BackToListButton />}>
        <SimpleForm>
            <NumberInput source="year" label="Año" />
            <DateInput source="startDate" label="Fecha de Inicio" />
            <DateInput source="endDate" label="Fecha de Fin" />
            <BooleanInput source="isActive" label="Activo" />
        </SimpleForm>
    </Edit>
);
