import { Create, SimpleForm, TextInput } from "react-admin";
import CRUDToolBar from "../../../layout/CRUDToolBar";

export const AccountingPlanCreate = () => (
  <Create
    redirect="list"
    transform={(data: Record<string, unknown>) => ({
      ...data,
      parentAccountId: null,
    })}
  >
    <SimpleForm toolbar={<CRUDToolBar save />}>
      <TextInput source="code" label="Código" />
      <TextInput source="printCode" label="Cód. Impresión" />
      <TextInput source="name" label="Nombre" />
    </SimpleForm>
  </Create>
);
