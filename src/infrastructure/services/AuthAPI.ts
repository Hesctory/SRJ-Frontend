import { API_URL, httpClient } from "../../ra/dataProvider";
import { LoginResponseData } from "../dtos/LoginResponseData";
//import type { userData } from '../dtos/userData';

export class AuthAPI {
  async login(email: string, password: string): Promise<LoginResponseData> {
    try {
      const response = await httpClient(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const loginResponse: LoginResponseData = await response.json;

      return loginResponse;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }
}
