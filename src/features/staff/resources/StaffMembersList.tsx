import { Datagrid, EditButton, List, TextField, TextInput } from "react-admin";

const staffFilters = [
  <TextInput key="fullName" source="fullName" label="Nombre" alwaysOn />,
  <TextInput
    key="documentNumber"
    source="documentNumber"
    label="N° Documento"
    alwaysOn
  />,
  <TextInput
    key="employeeCode"
    source="employeeCode"
    label="Código Empleado"
  />,
];

export const StaffMembersList = () => (
  <List filters={staffFilters} debounce={500}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="fullName" label="Nombre Completo" />
      <TextField source="documentNumber" label="N° Documento" />
      <TextField source="employeeCode" label="Código Empleado" />
      <TextField source="professionalTitle" label="Título Profesional" />
      <EditButton />
    </Datagrid>
  </List>
);
