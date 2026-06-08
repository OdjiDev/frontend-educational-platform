export interface User {
  id: number;
  email: string;
  role: 'admin' | 'student';
  is_active: boolean;
  phone?: string; // Optionnel, comme configuré sur ton FastAPI
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}