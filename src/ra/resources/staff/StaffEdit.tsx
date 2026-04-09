import { Edit, SimpleForm, TextInput } from "react-admin";

export const StaffEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="staffCode" label="Código de Personal" />
            <TextInput source="names" label="Nombres" />
            <TextInput source="paternalLastName" label="Apellido Paterno" />
            <TextInput source="maternalLastName" label="Apellido Materno" />
        </SimpleForm>
    </Edit>
);
