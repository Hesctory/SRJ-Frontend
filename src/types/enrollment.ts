import { Identifier } from "react-admin";

export interface EnrollmentSummary {
  id: Identifier;
  year: string | number;
  level: string;
  grade: string;
  shift: string;
  section: string;
  state: string;
}
