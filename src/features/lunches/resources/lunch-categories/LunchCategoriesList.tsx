import { Datagrid, EditButton, List, TextField } from "react-admin";

export const LunchCategoriesList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="name" label="Nombre" />
      <EditButton />
    </Datagrid>
  </List>
);
