import { ReferenceInput, SelectInput, required } from "react-admin";
import { FORM_DOWNSTREAM } from "../hooks/academicCascade";
import { useAcademicFormSelector } from "../hooks/useAcademicFormSelector";

interface AcademicFormSelectorProps {
  sourcePrefix?: string;
  required?: boolean;
}

const AcademicFormSelector = ({
  sourcePrefix,
  required: isFieldRequired = true,
}: AcademicFormSelectorProps) => {
  const base = sourcePrefix ? `${sourcePrefix}.` : "";
  const { schoolYearId, levelId, gradeId, shiftId, clearFields } =
    useAcademicFormSelector(base);

  const req = isFieldRequired ? { isRequired: true, validate: required() } : {};

  return (
    <>
      <ReferenceInput source={`${base}schoolYearId`} reference="school-years">
        <SelectInput
          label="Año Escolar"
          optionText="year"
          onChange={() => clearFields(FORM_DOWNSTREAM.schoolYearId)}
          {...req}
        />
      </ReferenceInput>

      {schoolYearId ? (
        <ReferenceInput source={`${base}levelId`} reference="levels">
          <SelectInput
            label="Nivel"
            onChange={() => clearFields(FORM_DOWNSTREAM.levelId)}
            {...req}
          />
        </ReferenceInput>
      ) : (
        <SelectInput
          source={`${base}levelId`}
          label="Nivel"
          choices={[]}
          disabled
          {...req}
        />
      )}

      {levelId ? (
        <ReferenceInput
          source={`${base}gradeId`}
          reference="grades"
          filter={{ schoolYearId, levelId }}
        >
          <SelectInput
            label="Grado"
            onChange={() => clearFields(FORM_DOWNSTREAM.gradeId)}
            {...req}
          />
        </ReferenceInput>
      ) : (
        <SelectInput
          source={`${base}gradeId`}
          label="Grado"
          choices={[]}
          disabled
          {...req}
        />
      )}

      {gradeId ? (
        <ReferenceInput
          source={`${base}shiftId`}
          reference="shifts"
          filter={{ schoolYearId, gradeId }}
        >
          <SelectInput
            label="Turno"
            onChange={() => clearFields(FORM_DOWNSTREAM.shiftId)}
            {...req}
          />
        </ReferenceInput>
      ) : (
        <SelectInput
          source={`${base}shiftId`}
          label="Turno"
          choices={[]}
          disabled
          {...req}
        />
      )}

      {shiftId ? (
        <ReferenceInput
          source={`${base}sectionId`}
          reference="sections"
          filter={{ schoolYearId, levelId, gradeId, shiftId }}
        >
          <SelectInput label="Sección" optionText="section" {...req} />
        </ReferenceInput>
      ) : (
        <SelectInput
          source={`${base}sectionId`}
          label="Sección"
          choices={[]}
          disabled
          {...req}
        />
      )}
    </>
  );
};

export default AcademicFormSelector;
