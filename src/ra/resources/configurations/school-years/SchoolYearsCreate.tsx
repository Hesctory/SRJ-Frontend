import { BooleanInput, Create, DateInput, NumberInput, SimpleForm } from "react-admin";

export const SchoolYearsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <NumberInput source="year" label="Año" />
            <DateInput source="startDate" label="Fecha de Inicio" />
            <DateInput source="endDate" label="Fecha de Fin" />
            <BooleanInput source="isActive" label="Activo" />
        </SimpleForm>
    </Create>
);
