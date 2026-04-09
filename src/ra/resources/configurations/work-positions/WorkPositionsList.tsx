import { DataTable, EditButton, List, TextField } from "react-admin";

export const WorkPositionsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="position" label="Cargo" sx={{ width: "90%" }}>
                <TextField source="position" />
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
