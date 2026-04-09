import { Create, SimpleForm, TextInput } from "react-admin";

export const CategoriesCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="category" label="Categoría" />
        </SimpleForm>
    </Create>
);
