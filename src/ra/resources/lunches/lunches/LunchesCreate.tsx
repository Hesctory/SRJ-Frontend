import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const LunchesCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="lunch" label="Almuerzo" />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput optionText="category" label="Categoría" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
