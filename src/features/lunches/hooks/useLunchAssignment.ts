import { useState } from "react";
import { useDataProvider, useNotify } from "react-admin";
import { CreateLunchAssignment } from "@/types/lunchAssignment";

const useLunchAssignment = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [submitting, setSubmitting] = useState(false);

  const create = async (payload: CreateLunchAssignment): Promise<boolean> => {
    setSubmitting(true);
    try {
      await dataProvider.create("lunch-assignments", { data: payload });
      notify("Loncheras asignadas correctamente", { type: "success" });
      return true;
    } catch (error) {
      console.error("[lunch-assignments] POST failed:", error);
      notify("Error al asignar loncheras", { type: "error" });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { create, submitting };
};

export default useLunchAssignment;
