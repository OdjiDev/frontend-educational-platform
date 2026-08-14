// src/app/app.routes.ts
import { Routes } from '@angular/router';
// import { authGuard } from './core/guards/auth.guard';
// import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // ============================================================
  // ROUTES PUBLIQUES (Authentification)
  // ============================================================
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  // },

  // ============================================================
  // ROUTES PROTÉGÉES (Layout principal)
  // ============================================================
  {
    path: '',
    //canActivate: [authGuard],
    children: [
      // ---------- ESPACE ÉTUDIANT ----------
      {
        path: 'student',
        //canActivate: [roleGuard(['admin', 'teacher', 'student'])],
        loadChildren: () => import('./features/student/student.routes').then(m => m.studentRoutes)
      },

      // ---------- ESPACE ENSEIGNANT ----------
      // {
      //   path: 'teacher',
      //   canActivate: [roleGuard(['admin', 'teacher'])],
      //   loadChildren: () => import('./features/teacher/teacher.routes').then(m => m.teacherRoutes)
      // },

      // ---------- ESPACE ADMIN ----------
      // {
      //   path: 'admin',
      //   canActivate: [roleGuard(['admin'])],
      //   loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
      // },

      // ---------- REDIRECTION PAR DÉFAUT ----------
      { path: '', redirectTo: '/student/dashboard', pathMatch: 'full' }
    ]
  },

  // ============================================================
  // ROUTE 404
  // ============================================================
  { path: '**', redirectTo: '/auth/login' }
];
