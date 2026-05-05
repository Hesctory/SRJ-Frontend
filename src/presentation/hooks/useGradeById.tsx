import { useGetOne } from "react-admin";
import { gradeData } from "../../infrastructure/dtos/gradeData";
/**
 * Infrastructure-layer hook that fetches a single grade via the RA data provider.
 * Keeps all data-provider coupling isolated from presentation logic.
 */
export const useGradeById = (
  id: number | undefined,
  enabled: boolean,
): gradeData | undefined => {
  const { data } = useGetOne<gradeData>(
    "grades",
    { id: id! },
    { enabled: enabled && !!id },
  );
  return data;
};
