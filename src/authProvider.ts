// authProvider.ts
import { AuthProvider } from 'react-admin';
import { AuthAPI } from './infrastructure/services/AuthAPI';
import { LoginUseCase } from './application/useCases/LoginUseCase';
import { AuthRepositoryImpl } from './repository/implementations/AuthRepositoryImpl';
import { DSession } from './domain/entities/DSession';

interface LoginParams {
    username: string;
    password: string;
}

const authProvider: AuthProvider = {
    login: async ({ username, password }: LoginParams) => {
        console.log(username);
        const authAPI = new AuthAPI();
        const authRepository = new AuthRepositoryImpl(authAPI);
        const loginUseCase = new LoginUseCase(authRepository);
        try {
            const user = await loginUseCase.execute(username, password);
            console.log(localStorage.getItem('token'), localStorage.getItem('user'));
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error instanceof Error ? error.message : 'Login failed');
        }
    },

    logout: async () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = localStorage.getItem('token');
        const expirationDate = DSession.getExpiresAtFromToken(token || '');
        
        if(!expirationDate || expirationDate < new Date() || !token) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkError: async (error: any) => {
        const status = error.status || error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: async () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.resolve();
    },
};

export default authProvider;