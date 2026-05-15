import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils, DataProvider } from 'react-admin';
    
export const JSON_API_URL = 'http://localhost:3000';
export const API_URL = 'http://localhost:4000/api';

// Cliente HTTP personalizado para agregar JWT
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    const token = localStorage.getItem('token');

    if (token) {
        (options.headers as Headers).set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

const simpleDataProvider = simpleRestProvider(API_URL, httpClient);
const jsonDataProvider = jsonServerProvider(JSON_API_URL);

const extendedSimpleDataProvider: DataProvider = {
    ...simpleDataProvider,
    getList: async (resource, params) => {
        if (resource === "students-report") {
            const { filter = {} } = params;
            const query = new URLSearchParams();
            Object.entries(filter).forEach(([k, v]) => {
                if (v !== undefined && v !== "") query.set(k, String(v));
            });
            const url = `${API_URL}/students/report?${query.toString()}`;
            const { json } = await httpClient(url);
            const data = Array.isArray(json) ? json : (json.data ?? []);
            return { data, total: data.length };
        }
        return simpleDataProvider.getList(resource, params);
    },
};

const dataProvider: DataProvider = extendedSimpleDataProvider;

export { dataProvider, httpClient };