import { Datagrid, EditButton, List, NumberField, ReferenceField, TextField } from "react-admin";

export const LunchesList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <ReferenceField source="lunchCategoryId" reference="lunch-categories" label="Categoría" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lunchName" label="Nombre" />
      <NumberField source="costPrice" label="Precio de Costo" options={{ style: "currency", currency: "PEN" }} />
      <NumberField source="salePrice" label="Precio de Venta" options={{ style: "currency", currency: "PEN" }} />
      <TextField source="comment" label="Comentario" />
      <EditButton />
    </Datagrid>
  </List>
);
