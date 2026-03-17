import { components } from "@/src/api/schema";

export type SignUpResponse = components["schemas"]["SignupResponseDto"];
export type SignUpRequest = components["schemas"]["SignUpDto"];
export type LoginRequest = components["schemas"]["LoginDto"];
export type LoginResponse = components["schemas"]["LoginResponseDto"];

export type User = components["schemas"]["UserDto"];
export type Role = User["role"];

export type ProfileResponse = User;