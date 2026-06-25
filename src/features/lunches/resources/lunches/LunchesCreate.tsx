import { Box } from "@mui/material";
import {
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
import CRUDToolBar from "@/app/layout/CRUDToolBar";

export const LunchesCreate = () => (
  <Create redirect="list" mutationMode="pessimistic">
    <SimpleForm toolbar={<CRUDToolBar save />}>
      <ReferenceInput source="lunchCategoryId" reference="lunch-categories">
        <SelectInput label="Categoría" validate={required()} isRequired />
      </ReferenceInput>
      <TextInput source="lunchName" label="Nombre" />
      <Box display="flex" gap={2} width="100%">
        <NumberInput source="costPrice" label="Precio de Costo" />
        <NumberInput source="salePrice" label="Precio de Venta" />
      </Box>
      <TextInput source="comment" label="Comentario" multiline rows={3} />
    </SimpleForm>
  </Create>
);
