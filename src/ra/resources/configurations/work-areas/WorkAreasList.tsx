import { DataTable, EditButton, List, TextField } from "react-admin";

export const WorkAreasList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="area" label="Área" sx={{ width: "90%" }}>
        <TextField source="area" />
      </DataTable.Col>
      <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);
