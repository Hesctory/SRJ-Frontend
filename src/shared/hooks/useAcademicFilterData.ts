import { useGetList } from "react-admin";

interface SchoolYear {
  id: string | number;
  year: string;
}
interface AcademicLevel {
  id: string | number;
  name: string;
}
interface Grade {
  id: string | number;
  name: string;
}
interface Shift {
  id: string | number;
  name: string;
}
interface Section {
  id: string | number;
  section: string;
}

interface UseAcademicFilterDataResult {
  schoolYears: SchoolYear[];
  levels: AcademicLevel[];
  grades: Grade[];
  shifts: Shift[];
  sections: Section[];
}

export const useAcademicFilterData = (
  schoolYearId: unknown,
  levelId: unknown,
  gradeId: unknown,
  shiftId: unknown,
): UseAcademicFilterDataResult => {
  const { data: schoolYears = [] } = useGetList<SchoolYear>("school-years", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "year", order: "DESC" },
  });

  const { data: levels = [] } = useGetList<AcademicLevel>("levels", {
    pagination: { page: 1, perPage: 100 },
  });

  const { data: grades = [] } = useGetList<Grade>(
    "grades",
    {
      pagination: { page: 1, perPage: 100 },
      filter: { ...(schoolYearId && { schoolYearId }), levelId },
    },
    { enabled: !!levelId },
  );

  const { data: shifts = [] } = useGetList<Shift>(
    "shifts",
    {
      pagination: { page: 1, perPage: 100 },
      filter: { ...(schoolYearId && { schoolYearId }), gradeId },
    },
    { enabled: !!gradeId },
  );

  const { data: sections = [] } = useGetList<Section>(
    "sections",
    {
      pagination: { page: 1, perPage: 100 },
      filter: {
        ...(schoolYearId && { schoolYearId }),
        ...(levelId && { levelId }),
        gradeId,
        shiftId,
      },
    },
    { enabled: !!shiftId },
  );

  return { schoolYears, levels, grades, shifts, sections };
};
