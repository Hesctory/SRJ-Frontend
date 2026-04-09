import { DataTable, EditButton, List, ReferenceField, ReferenceInput, SelectInput, TextInput, TextField } from "react-admin";

const legalEntitiesFilters = [
    <TextInput key="name" source="name" label="Nombre" alwaysOn />,
    <ReferenceInput key="validFrom" source="validFrom" reference="school-years">
        <SelectInput optionText="schoolYear" label="Año" />
    </ReferenceInput>,
];

export const LegalEntitiesList = () => (
    <List filters={legalEntitiesFilters}>
        <DataTable>
            <DataTable.Col source="name" label="Nombre" sx={{ width: "50%" }} />
            <DataTable.Col source="ruc" label="RUC" sx={{ width: "20%" }} />
            <DataTable.Col source="validFrom" label="Vigente desde">
                <ReferenceField source="validFrom" reference="school-years" link={false}>
                    <TextField source="schoolYear" />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col source="validTo" label="Vigente hasta">
                <ReferenceField source="validTo" reference="school-years" link={false} emptyText="—">
                    <TextField source="schoolYear" />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
