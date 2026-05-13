import { ReferenceInput, SelectInput, required } from "react-admin";
import { useWatch } from "react-hook-form";

interface AcademicFormSelectorProps {
    sourcePrefix?: string;
}

const AcademicFormSelector = ({ sourcePrefix }: AcademicFormSelectorProps) => {
    const base = sourcePrefix ? `${sourcePrefix}.` : "";
    const schoolYearId = useWatch({ name: `${base}schoolYearId` });
    const levelId = useWatch({ name: `${base}levelId` });
    const gradeId = useWatch({ name: `${base}gradeId` });
    const shiftId = useWatch({ name: `${base}shiftId` });

    return (
        <>
            <ReferenceInput source={`${base}schoolYearId`} reference="school-years">
                <SelectInput label="Año Escolar" optionText="year" isRequired validate={required()} />
            </ReferenceInput>

            {schoolYearId ? (
                <ReferenceInput source={`${base}levelId`} reference="levels">
                    <SelectInput label="Nivel" isRequired validate={required()} />
                </ReferenceInput>
            ) : (
                <SelectInput source={`${base}levelId`} label="Nivel" choices={[]} disabled isRequired validate={required()} />
            )}

            {levelId ? (
                <ReferenceInput
                    source={`${base}gradeId`}
                    reference="grades"
                    filter={{ schoolYearId, levelId }}
                >
                    <SelectInput label="Grado" isRequired validate={required()} />
                </ReferenceInput>
            ) : (
                <SelectInput source={`${base}gradeId`} label="Grado" choices={[]} disabled isRequired validate={required()} />
            )}

            {gradeId ? (
                <ReferenceInput
                    source={`${base}shiftId`}
                    reference="shifts"
                    filter={{ schoolYearId, gradeId }}
                >
                    <SelectInput label="Turno" isRequired validate={required()} />
                </ReferenceInput>
            ) : (
                <SelectInput source={`${base}shiftId`} label="Turno" choices={[]} disabled isRequired validate={required()} />
            )}

            {shiftId ? (
                <ReferenceInput
                    source={`${base}sectionId`}
                    reference="sections"
                    filter={{ schoolYearId, levelId, gradeId, shiftId }}
                >
                    <SelectInput label="Sección" optionText="section" isRequired validate={required()} />
                </ReferenceInput>
            ) : (
                <SelectInput source={`${base}sectionId`} label="Sección" choices={[]} disabled isRequired validate={required()} />
            )}
        </>
    );
};

export default AcademicFormSelector;
