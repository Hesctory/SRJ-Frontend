import { DataTable, EditButton, List, ReferenceField, TextField } from "react-admin";

export const LevelsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="level" label="Nivel" sx={{ width: "50%" }} />
            <DataTable.Col source="legalEntityId" label="Entidad Legal" sx={{ width: "40%" }}>
                <ReferenceField source="legalEntityId" reference="legal-entities" link={false}>
                    <TextField source="name" />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
