import { userData } from "./userData";

export type LoginResponseData = {
  success: boolean;
  token: string;
  user: userData | null;
  error: string | null;
};
