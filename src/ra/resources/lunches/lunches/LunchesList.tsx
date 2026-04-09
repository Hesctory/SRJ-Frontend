import { DataTable, EditButton, List, ReferenceField, TextField } from "react-admin";

export const LunchesList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="lunch" label="Almuerzo" sx={{ width: "60%" }}>
                <TextField source="lunch" />
            </DataTable.Col>
            <DataTable.Col source="categoryId" label="Categoría" sx={{ width: "30%" }}>
                <ReferenceField source="categoryId" reference="categories" link={false}>
                    <TextField source="category" />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
