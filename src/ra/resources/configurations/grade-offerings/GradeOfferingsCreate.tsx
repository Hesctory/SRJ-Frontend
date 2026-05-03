import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm } from "react-admin";

export const GradeOfferingsCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <ReferenceInput source="schoolYearId" reference="school-years">
                <SelectInput optionText="year" label="Año Escolar" />
            </ReferenceInput>
            <ReferenceInput source="gradeId" reference="grades">
                <SelectInput optionText="name" label="Grado" />
            </ReferenceInput>
            <ReferenceInput source="shiftId" reference="shifts">
                <SelectInput optionText="name" label="Turno" />
            </ReferenceInput>
            <NumberInput source="sections" label="Número de Secciones" min={1} />
        </SimpleForm>
    </Create>
);
