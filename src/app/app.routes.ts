// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';
import { studentGuard } from './core/guards/student.guard';

export const routes: Routes = [
  // 1. Redirection automatique si on arrive sur la racine http://localhost:4200
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Route du Login en Lazy Loading (Chargement à la demande)
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },

  // Route sécurisée pour le Tableau de bord Admin
  // { 
  //   path: 'admin-dashboard', 
  //   loadComponent: () => import('./features/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
  //   canActivate: [adminGuard] // Protégé par ton Guard validé
  // },

  // // 4. Route sécurisée pour l'Espace Étudiant
  // { 
  //   path: 'student-courses', 
  //   loadComponent: () => import('./features/student-space/student-courses/student-courses.component').then(m => m.StudentCoursesComponent),
  //   canActivate: [studentGuard] // Protégé par ton Guard validé
  // },

  // 5. Redirection de secours si l'utilisateur tape une URL qui n'existe pas
  { path: '**', redirectTo: 'login' }
];