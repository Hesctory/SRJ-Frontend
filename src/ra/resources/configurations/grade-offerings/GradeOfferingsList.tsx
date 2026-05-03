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
    useListContext,
    useRecordContext,
} from "react-admin";

const DebugLogger = () => {
    const { data } = useListContext();
    console.log("gradeOfferings:", data);
    const grade = useRecordContext();
    console.log("grade:", grade);
    return null;
};

const GradeName = () => {
    const grade = useRecordContext();
    console.log("grade:", grade);
    if (!grade) return null;
    return (
        <span>
            {grade.name}
            {" "}
            <ReferenceField source="levelId" reference="levels" link={false}>
                <TextField source="name" />
            </ReferenceField>
        </span>
    );
};

const gradeOfferingsFilters = [
    <ReferenceInput key="schoolYearId" source="schoolYearId" reference="school-years" alwaysOn>
        <SelectInput optionText="year" label="Año Escolar" />
    </ReferenceInput>,
];

const GradeOfferingsListContent = ({ defaultSchoolYearId }: { defaultSchoolYearId: number }) => (
    <List filters={gradeOfferingsFilters} filterDefaultValues={{ schoolYearId: defaultSchoolYearId }}>
        <DebugLogger />
        <DataTable>
            <DataTable.Col source="schoolYearId" label="Año Escolar" sx={{ width: "15%" }}>
                <ReferenceField source="schoolYearId" reference="school-years" link={false}>
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
    console.log(currentYear)
    const { data, isLoading } = useGetList("school-years", {
        filter: { year: currentYear },
        pagination: { page: 1, perPage: 1 },
    });

    if (isLoading) return <Loading />;

    const defaultSchoolYearId = data?.[0]?.id;
    console.log(data)
    return <GradeOfferingsListContent defaultSchoolYearId={defaultSchoolYearId} />;
};
