export interface UserResponse {
    id: string;
    email: string;
    role: string;
    is_active: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    display_name?: string;
}
