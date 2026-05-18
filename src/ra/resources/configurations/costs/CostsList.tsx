import {
  DataTable,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
} from "react-admin";

const costsFilters = [
  <ReferenceInput
    key="schoolYearId"
    source="schoolYearId"
    reference="school-years"
    alwaysOn
  >
    <SelectInput optionText="schoolYear" label="Año Escolar" disableEmpty />
  </ReferenceInput>,
];

export const CostsList = () => (
  <List filters={costsFilters} filterDefaultValues={{ schoolYearId: 8 }}>
    <DataTable>
      <DataTable.Col source="levelId" label="Nivel" sx={{ width: "20%" }}>
        <ReferenceField source="levelId" reference="levels" link={false}>
          <TextField source="level" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="shift" label="Turno" sx={{ width: "10%" }}>
        <TextField source="shift" />
      </DataTable.Col>
      <DataTable.Col
        source="inscription"
        label="Inscripción"
        sx={{ width: "15%" }}
      >
        <NumberField source="inscription" />
      </DataTable.Col>
      <DataTable.Col
        source="enrollment"
        label="Matrícula"
        sx={{ width: "15%" }}
      >
        <NumberField source="enrollment" />
      </DataTable.Col>
      <DataTable.Col source="monthly" label="Mensualidad" sx={{ width: "15%" }}>
        <NumberField source="monthly" />
      </DataTable.Col>
      <DataTable.Col
        source="schoolYearId"
        label="Año Escolar"
        sx={{ width: "15%" }}
      >
        <ReferenceField
          source="schoolYearId"
          reference="school-years"
          link={false}
        >
          <TextField source="schoolYear" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);
