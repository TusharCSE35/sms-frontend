import api from '@/lib/api';
import type { AuthResponse, User } from '@/types/user';
import type { LoginInput, RegisterInput } from '@/lib/validations';

export const authService = {
    async login(data: LoginInput): Promise<AuthResponse> {
        const res = await api.post('/login', data);
        return res.data;
    },

    async register(data: RegisterInput): Promise<AuthResponse> {
        const res = await api.post('/register', data);
        return res.data;
    },

    async logout(): Promise<void> {
        await api.post('/logout');
    },

    async me(): Promise<User> {
        const res = await api.get('/user');
        return res.data;
    },
};