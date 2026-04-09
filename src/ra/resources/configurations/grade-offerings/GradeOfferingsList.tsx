import { ChipField, DataTable, EditButton, List, ReferenceField, TextField, useRecordContext } from "react-admin";

const GradeName = () => {
    const grade = useRecordContext();
    if (!grade) return null;
    return (
        <span>
            <ReferenceField source="levelId" reference="levels" link={false}>
                <TextField source="level" />
            </ReferenceField>
            {" "}
            {grade.grade}
        </span>
    );
};

export const GradeOfferingsList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="gradeId" label="Grado" sx={{ width: "50%" }}>
                <ReferenceField source="gradeId" reference="grades" link={false}>
                    <GradeName />
                </ReferenceField>
            </DataTable.Col>
            <DataTable.Col source="shift" label="Turno" sx={{ width: "20%" }}>
                <ChipField source="shift" />
            </DataTable.Col>
            <DataTable.Col source="sections" label="Secciones" sx={{ width: "20%" }}>
                <TextField source="sections" />
            </DataTable.Col>
            <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
