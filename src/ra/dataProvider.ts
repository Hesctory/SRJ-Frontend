import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils, DataProvider } from 'react-admin';

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

// DataProvider tipado
const dataProvider: DataProvider = simpleRestProvider(API_URL, httpClient);

export { dataProvider, httpClient };