/**
 * SANKALP API Client
 * 
 * All frontend communication with the FastAPI backend MUST go through this client.
 * The backend is expected to expose routes exclusively at /api/v1/*.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Ensure endpoint doesn't start with / if it shouldn't, or ensure it does if expected.
  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  const response = await fetch(`${BASE_URL}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // Ignore JSON parse error for error responses
    }
    throw new ApiError(response.status, errorMessage);
  }

  return response.json();
}

// Example Typed Contracts (to be expanded as domains are implemented)

export interface HealthResponse {
  status: string;
  version: string;
}

export const sankalpApi = {
  health: {
    check: () => fetchApi<HealthResponse>('health'),
    checkDb: () => fetchApi<{ status: string }>('health/db'),
  },
  // Add domain endpoints here (chat, scam, safety, skills, etc.)
};
