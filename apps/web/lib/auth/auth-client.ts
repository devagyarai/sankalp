import { apiClient } from '../api/client';
import { StandardResponse } from '../api/types';
import { LoginRequest, RegisterRequest, UserResponse } from './auth-types';

class AuthClient {
    async register(data: RegisterRequest): Promise<StandardResponse<UserResponse>> {
        return apiClient.post<StandardResponse<UserResponse>>('/auth/register', data);
    }

    async login(data: LoginRequest): Promise<StandardResponse<UserResponse>> {
        return apiClient.post<StandardResponse<UserResponse>>('/auth/login', data);
    }

    async logout(): Promise<StandardResponse<void>> {
        return apiClient.post<StandardResponse<void>>('/auth/logout', {});
    }

    async getMe(): Promise<StandardResponse<UserResponse>> {
        return apiClient.get<StandardResponse<UserResponse>>('/auth/me');
    }
}

export const authClient = new AuthClient();
