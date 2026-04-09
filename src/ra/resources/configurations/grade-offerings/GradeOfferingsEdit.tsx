import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, useGetOne, useRecordContext } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";
import { useGradeOfferingForm } from "../../../../presentation/hooks/useGradeOfferingForm";
import { gradeData } from "../../../../infrastructure/dtos/gradeData";

const gradeOfferingTransform = (data: Record<string, unknown>) => {
    const { _levelId, ...rest } = data;
    return rest;
};

const GradeOfferingsEditFields = () => {
    const levelId = useGradeOfferingForm();
    return (
        <>
            <ReferenceInput source="_levelId" reference="levels">
                <SelectInput optionText="level" label="Nivel" />
            </ReferenceInput>
            <ReferenceInput
                source="gradeId"
                reference="grades"
                filter={levelId ? { levelId } : {}}
            >
                <SelectInput optionText="grade" label="Grado" disabled={!levelId} />
            </ReferenceInput>
            <ReferenceInput source="shift" reference="shifts">
                <SelectInput optionText="name" optionValue="name" label="Turno" />
            </ReferenceInput>
            <NumberInput source="nSections" label="Número de Secciones" min={1} />
        </>
    );
};

const GradeOfferingsEditForm = () => {
    const record = useRecordContext();
    const { data: grade, isLoading } = useGetOne<gradeData>(
        "grades",
        { id: record?.gradeId },
        { enabled: !!record?.gradeId }
    );

    if (record?.gradeId && isLoading) return null;

    return (
        <SimpleForm defaultValues={{ _levelId: grade?.levelId }}>
            <GradeOfferingsEditFields />
        </SimpleForm>
    );
};

export const GradeOfferingsEdit = () => (
    <Edit actions={<BackToListButton />} transform={gradeOfferingTransform}>
        <GradeOfferingsEditForm />
    </Edit>
);
