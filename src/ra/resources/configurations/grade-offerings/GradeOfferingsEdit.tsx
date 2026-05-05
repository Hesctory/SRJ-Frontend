import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, useGetList, useGetOne, useRecordContext } from "react-admin";
import CRUDToolBar from "../../../layout/CRUDToolBar";

const DebugLogger = () => {
    const gradeOffering = useRecordContext();
    const { data: grade } = useGetOne(
        "grades",
        { id: gradeOffering?.gradeId },
        { enabled: !!gradeOffering?.gradeId }
    );

    console.log("gradeOffering:", gradeOffering);
    console.log("grade:", grade);

    return null;
};

const FullGradeSelectInput = () => {
    const { data: grades = [] } = useGetList("grades", { pagination: { page: 1, perPage: 200 } });
    const { data: levels = [] } = useGetList("levels", { pagination: { page: 1, perPage: 200 } });

    const levelMap = Object.fromEntries(levels.map(l => [l.id, l.name]));
    const choices = grades.map(g => ({
        id: g.id,
        name: `${g.name} de ${levelMap[g.levelId] ?? ""}`.trim(),
    }));

    return <SelectInput source="gradeId" choices={choices} label="Grado" />;
};

export const GradeOfferingsEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm toolbar={<CRUDToolBar save delete />}>
            <DebugLogger />
            <ReferenceInput source="schoolYearId" reference="school-years">
                <SelectInput optionText="year" label="Año Escolar" />
            </ReferenceInput>
            <FullGradeSelectInput />
            <ReferenceInput source="shiftId" reference="shifts">
                <SelectInput optionText="name" label="Turno" />
            </ReferenceInput>
            <NumberInput source="sections" label="Número de Secciones" min={1} />
        </SimpleForm>
    </Edit>
);
