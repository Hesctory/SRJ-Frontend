import simpleRestProvider from "ra-data-simple-rest";
import jsonServerProvider from "ra-data-json-server";
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
const jsonDataProvider = jsonServerProvider(JSON_API_URL);

// Map of report-only resources to their backend URL builders.
// Each entry receives the filter object and returns the full URL.
// Add a new entry here whenever a new report endpoint is needed.
const REPORT_ENDPOINTS: Record<
  string,
  (filter: Record<string, string>) => string
> = {
  "students-enrolled-report": (filter) => {
    const q = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    return `${API_URL}/students/report?${q.toString()}`;
  },
  "students-registration-card-report": (filter) => {
    const q = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    return `${API_URL}/students/registration-card?${q.toString()}`;
  },
  "students-birthdays-report": (filter) => {
    const q = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    return `${API_URL}/students/birthdays?${q.toString()}`;
  },
  "students-withdrawn-report": (filter) => {
    const q = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    return `${API_URL}/students/withdrawn?${q.toString()}`;
  },
};

const extendedSimpleDataProvider: DataProvider = {
  ...simpleDataProvider,
  getList: async (resource, params) => {
    const reportBuilder = REPORT_ENDPOINTS[resource];
    if (reportBuilder) {
      const filter: Record<string, string> = {};
      Object.entries(params.filter ?? {}).forEach(([k, v]) => {
        if (v !== undefined && v !== "") filter[k] = String(v);
      });
      const url = reportBuilder(filter);
      const { json } = await httpClient(url);
      const data = Array.isArray(json) ? json : (json.data ?? []);
      return { data, total: data.length };
    }
    return simpleDataProvider.getList(resource, params);
  },
};

const BATCH_CREATE_RESOURCES = new Set(["lunch-assignments"]);

const dataProvider: DataProvider = {
  ...extendedSimpleDataProvider,
  create: async (resource, params) => {
    if (BATCH_CREATE_RESOURCES.has(resource)) {
      const { json } = await httpClient(`${API_URL}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      // Backend returns { ids: [1, 2, 3] }; return a minimal record to satisfy React Admin
      //return { data: { id: (json as { ids: number[] }).ids[0] } };
      return {
        data: {
          id: (json as { ids: number[] }).ids[0],
        } as any,
      };
    }
    return extendedSimpleDataProvider.create(resource, params);
  },
};

export { dataProvider, httpClient };
