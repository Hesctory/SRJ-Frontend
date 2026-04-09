import { DataTable, EditButton, List, TextField } from "react-admin";

export const CategoriesList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="category" label="Categoría" sx={{ width: "90%" }}>
                <TextField source="category" />
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
