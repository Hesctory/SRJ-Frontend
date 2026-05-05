import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils, DataProvider } from "react-admin";

export const JSON_API_URL = "http://localhost:3000";
export const API_URL = "http://localhost:4000/api";

// Cliente HTTP personalizado para agregar JWT
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = localStorage.getItem("token");

  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

const simpleDataProvider = simpleRestProvider(API_URL, httpClient);

export interface SchoolYear {
  id: number;
  name: string;
  gradeOfferingsAvailable?: boolean;
}

const dataProvider: DataProvider & {
  enrollStudent: (payload: {
    student: unknown;
    enrollment: unknown;
  }) => Promise<{ studentId: number; enrollmentId: number }>;
  reenrollStudent: (
    id: number | string,
    payload: unknown,
  ) => Promise<{ enrollmentId: number }>;
  getEligibleYears: (id: number | string) => Promise<SchoolYear[]>;
} = {
  ...simpleDataProvider,
  enrollStudent: (payload) =>
    httpClient(`${API_URL}/students/enroll`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(({ json }) => json),

  reenrollStudent: (id, payload) =>
    httpClient(`${API_URL}/students/${id}/reenroll`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(({ json }) => json),

  getEligibleYears: (id) =>
    httpClient(`${API_URL}/students/${id}/eligible-school-years`).then(
      ({ json }) => json as SchoolYear[],
    ),
};

export { dataProvider, httpClient };
