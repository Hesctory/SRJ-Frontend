import { DataTable, EditButton, List } from "react-admin";

export const SchoolYearsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="schoolYear" label="Año Escolar" sx={{ width: "15%" }} />
            <DataTable.Col source="date" label="Fecha de Inicio" sx={{ width: "42.5%" }} />
            <DataTable.Col source="endDate" label="Fecha de Fin" sx={{ width: "42.5%" }} />
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
