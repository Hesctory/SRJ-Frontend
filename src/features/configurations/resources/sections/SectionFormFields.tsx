import { useEffect, useRef } from "react";
import {
  ReferenceInput,
  SelectInput,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { useWatch, useFormContext } from "react-hook-form";

const sectionChoices = [
  { id: "A", name: "A" },
  { id: "B", name: "B" },
  { id: "C", name: "C" },
  { id: "D", name: "D" },
];

/**
 * In Edit mode, reads the current record's gradeId, fetches that grade,
 * and initializes _levelId so the cascading select is pre-filled.
 */

const LevelInitializer = () => {
  const record = useRecordContext();
  const { setValue, getValues } = useFormContext();
  const { data: grade } = useGetOne(
    "grades",
    { id: record?.gradeId },
    { enabled: !!record?.gradeId },
  );

  useEffect(() => {
    if (grade?.levelId && !getValues("_levelId")) {
      setValue("_levelId", grade.levelId);
    }
  }, [grade, setValue, getValues]);

  return null;
};

/**
 * Grade select filtered by the currently selected level.
 * Resets gradeId when the level changes (but not on first render).
 */

const GradeSelectInput = () => {
  const { setValue } = useFormContext();
  const levelId = useWatch({ name: "_levelId" });
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    setValue("gradeId", null);
  }, [levelId, setValue]);

  return (
    <ReferenceInput
      source="gradeId"
      reference="grades"
      filter={levelId ? { levelId } : {}}
    >
      <SelectInput optionText="grade" label="Grado" disabled={!levelId} />
    </ReferenceInput>
  );
};

interface SectionFormFieldsProps {
  isEdit?: boolean;
}

export const SectionFormFields = ({
  isEdit = false,
}: SectionFormFieldsProps) => (
  <>
    {isEdit && <LevelInitializer />}
    <ReferenceInput source="_levelId" reference="levels">
      <SelectInput optionText="level" label="Nivel" />
    </ReferenceInput>
    <GradeSelectInput />
    <SelectInput source="section" label="Sección" choices={sectionChoices} />
  </>
);

export const sectionTransform = (data: Record<string, unknown>) => {
  const { _levelId, ...rest } = data;
  return rest;
};
