import { SelectInput, useDataProvider } from "react-admin";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import type { GradeData } from "@/types/grade";

const CascadeGradeInput = () => {
  const dataProvider = useDataProvider();
  const level = useWatch({ name: "levelId" });
  const [choices, setChoices] = useState<GradeData[]>([]);

  useEffect(() => {
    if (level) {
      dataProvider
        .getList<GradeData>("grades", {
          filter: { levelId: level },
          pagination: { page: 1, perPage: 100 },
          sort: { field: "name", order: "ASC" },
        })
        .then(({ data }) => {
          setChoices(data);
        });
    } else {
      setChoices([]);
    }
  }, [level]);

  return <SelectInput source="gradeId" choices={choices} />;
};

export default CascadeGradeInput;
