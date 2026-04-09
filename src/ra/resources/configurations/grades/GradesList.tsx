import { DataTable, EditButton, List, ReferenceField, TextField, useRecordContext } from "react-admin";

const GradeWithLevel = () => {
    const record = useRecordContext();
    if (!record) return null;
    return (
        <span>
            {record.grade}{" "}
            <ReferenceField source="levelId" reference="levels" link={false}>
                <TextField source="level" />
            </ReferenceField>
        </span>
    );
};

export const GradesList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="grade" label="Grado" sx={{ width: "90%" }}>
                <GradeWithLevel />
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
