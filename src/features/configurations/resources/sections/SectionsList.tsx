import {
  DataTable,
  EditButton,
  List,
  ReferenceField,
  TextField,
  useRecordContext,
} from "react-admin";

const GradeFullName = () => {
  const grade = useRecordContext();
  if (!grade) return null;
  return (
    <span>
      <ReferenceField source="levelId" reference="levels" link={false}>
        <TextField source="level" />
      </ReferenceField>{" "}
      {grade.grade + " - " + grade.shift}
    </span>
  );
};

export const SectionsList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="gradeId" label="Grado" sx={{ width: "60%" }}>
        <ReferenceField source="gradeId" reference="grades" link={false}>
          <GradeFullName />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="section" label="Sección" sx={{ width: "30%" }}>
        <TextField source="section" />
      </DataTable.Col>
      <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);
