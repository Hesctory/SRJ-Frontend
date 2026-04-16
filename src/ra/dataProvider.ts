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

// DataProvider tipado
const dataProvider: DataProvider = jsonDataProvider;


export { dataProvider, httpClient };