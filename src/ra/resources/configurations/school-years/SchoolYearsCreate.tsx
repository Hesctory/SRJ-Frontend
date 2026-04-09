import { Create, SimpleForm, TextInput } from "react-admin";

export const SchoolYearsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="schoolYear" label="Año Escolar" />
            <TextInput source="date" label="Fecha de Inicio" />
            <TextInput source="endDate" label="Fecha de Fin" />
        </SimpleForm>
    </Create>
);
