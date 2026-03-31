// authProvider.ts
import { AuthProvider } from 'react-admin';
import { AuthAPI } from './infrastructure/services/AuthAPI';
import { LoginUseCase } from './application/useCases/LoginUseCase';
import { AuthRepositoryImpl } from './repository/implementations/AuthRepositoryImpl';

interface LoginParams {
    username: string;
    password: string;
}

const authProvider: AuthProvider = {
    // Login: recibe datos del formulario
    login: async ({ username, password }: LoginParams) => {
        console.log(username);
        const authAPI = new AuthAPI();
        const authRepository = new AuthRepositoryImpl(authAPI);
        const loginUseCase = new LoginUseCase(authRepository);
        try {
            const user = await loginUseCase.execute(username, password);
            // Guarda token (aquí podrías usar JWT o similar)
            localStorage.setItem('token', JSON.stringify(user));
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error instanceof Error ? error.message : 'Login failed');
        }
    },

    // Logout: elimina token
    logout: async () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    // CheckAuth: revisa si el usuario sigue logueado
    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (token) return Promise.resolve();
        return Promise.reject({ redirectTo: '/login' });
    },

    // CheckError: maneja errores de auth (401, 403)
    checkError: async (error: any) => {
        const status = error.status || error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject({ redirectTo: '/login' });
        }
        return Promise.resolve();
    },

    // Permisos (roles)
    getPermissions: async () => {
        // Si quieres manejar roles
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.resolve();
    },
};

export default authProvider;