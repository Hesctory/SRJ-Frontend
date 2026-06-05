import {
  DataTable,
  EditButton,
  List,
} from "react-admin";

export const StaffMembersList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="staffCode" label="Código de Personal" />
      <DataTable.Col
        label="Nombre Completo"
        render={(record) =>
          `${record.names} ${record.paternalLastName} ${record.maternalLastName}`
        }
      />
      <DataTable.Col source="positionId" label="Posición" />
      <DataTable.Col source="areaId" label="Área" />
      <EditButton />
    </DataTable>
  </List>
);
