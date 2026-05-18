import { AuthProvider } from "react-admin";
import { httpClient, API_URL } from "./ra/dataProvider";
import { parseTokenExpiry } from "./utils/token";

interface LoginParams {
  username: string;
  password: string;
}

const authProvider: AuthProvider = {
  login: async ({ username, password }: LoginParams) => {
    const { json } = await httpClient(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
    });
    if (!json.success || !json.user || !json.token) {
      return Promise.reject(json.error ?? "Login fallido");
    }
    localStorage.setItem("token", json.token);
    localStorage.setItem("user", JSON.stringify(json.user));
    return Promise.resolve();
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve();
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return Promise.reject();

    const expiry = parseTokenExpiry(token);
    if (expiry && expiry < new Date()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return Promise.reject();
    }

    return Promise.resolve();
  },

  checkError: async (error: any) => {
    const status = error.status || error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: async () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return Promise.resolve(null);
    try {
      const user = JSON.parse(userJson);
      return Promise.resolve(user.roles ?? null);
    } catch {
      return Promise.resolve(null);
    }
  },
};

export default authProvider;
