import {
  DataTable,
  EditButton,
  List,
  Loading,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  TextField,
  useGetList,
  useRecordContext,
} from "react-admin";

const GradeName = () => {
  const grade = useRecordContext();
  if (!grade) return null;
  return (
    <span>
      {grade.name}{" "}
      <ReferenceField source="levelId" reference="levels" link={false}>
        <TextField source="name" />
      </ReferenceField>
    </span>
  );
};

const gradeOfferingsFilters = [
  <ReferenceInput
    key="schoolYearId"
    source="schoolYearId"
    reference="school-years"
    alwaysOn
  >
    <SelectInput optionText="year" label="Año Escolar" />
  </ReferenceInput>,
];

const GradeOfferingsListContent = ({
  defaultSchoolYearId,
}: {
  defaultSchoolYearId: number;
}) => (
  <List
    filters={gradeOfferingsFilters}
    filterDefaultValues={{ schoolYearId: defaultSchoolYearId }}
  >
    <DataTable>
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
          <TextField source="year" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="gradeId" label="Grado" sx={{ width: "40%" }}>
        <ReferenceField source="gradeId" reference="grades" link={false}>
          <GradeName />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="shiftId" label="Turno" sx={{ width: "25%" }}>
        <ReferenceField source="shiftId" reference="shifts" link={false}>
          <TextField source="name" />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="sections" label="Secciones" sx={{ width: "15%" }}>
        <TextField source="sections" />
      </DataTable.Col>
      <DataTable.Col label="" sx={{ width: 1, whiteSpace: "nowrap" }}>
        <EditButton />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const GradeOfferingsList = () => {
  const currentYear = new Date().getFullYear();
  const { data, isLoading } = useGetList("school-years", {
    filter: { year: currentYear },
    pagination: { page: 1, perPage: 1 },
  });

  if (isLoading) return <Loading />;

  const defaultSchoolYearId = data?.[0]?.id;
  return (
    <GradeOfferingsListContent defaultSchoolYearId={defaultSchoolYearId} />
  );
};
