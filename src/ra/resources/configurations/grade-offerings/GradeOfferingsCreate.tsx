import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm } from "react-admin";
import { useGradeOfferingForm } from "../../../../presentation/hooks/useGradeOfferingForm";

const gradeOfferingTransform = (data: Record<string, unknown>) => {
    const { _levelId, ...rest } = data;
    return rest;
};

const GradeOfferingsCreateFields = () => {
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

export const GradeOfferingsCreate = () => (
    <Create redirect="list" transform={gradeOfferingTransform}>
        <SimpleForm>
            <GradeOfferingsCreateFields />
        </SimpleForm>
    </Create>
);
