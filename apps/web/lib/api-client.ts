export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/api/v1${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // For this MVP, we mock an Authorization header for the test user since real auth isn't wired
  // The test user is seeded by the backend in development
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer test-token-student', 
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error ${response.status}: ${errorBody}`);
  }

  const json = await response.json();
  // The backend uses StandardResponse format: { "data": ... }
  return json.data !== undefined ? json.data : json;
}
