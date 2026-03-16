export interface SignUpResponse {
    message: string;
    userId: number;
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export type ProfileResponse = User;