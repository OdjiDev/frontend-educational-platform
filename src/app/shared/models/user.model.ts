// src/app/shared/models/user.model.ts
export type UserRole = 'admin' | 'teacher' | 'student';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photo_profil?: string;
  adresse?: string;
  ville_id?: number;
  role: UserRole;
  statut: UserStatus;
  created_at: string;
  updated_at: string;
}

// ✅ Ajout de LoginResponse
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Guards de type
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function isTeacher(user: User): boolean {
  return user.role === 'teacher';
}

export function isStudent(user: User): boolean {
  return user.role === 'student';
}

export function canManageCourses(user: User): boolean {
  return user.role === 'admin' || user.role === 'teacher';
}

export function isActive(user: User): boolean {
  return user.statut === 'active';
}
