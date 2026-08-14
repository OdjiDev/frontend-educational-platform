// features/student/student.routes.ts
import { Routes } from '@angular/router';

export const studentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard-student.component')
          .then(m => m.DashboardStudentComponent)
      },
     {
        path: 'courses',
        loadComponent: () => import('./course-list/course-list-student.component')
          .then(m => m.CourseListStudentComponent)
      },
       {
        path: 'courses/:id',
        loadComponent: () => import('./course-detail/course-detail-student.component')
          .then(m => m.CourseDetailStudentComponent)
      },
    
//       {
//         path: 'exams',
//         loadComponent: () => import('./exam-list/exam-list-student.component')
//           .then(m => m.ExamListStudentComponent)
//       },
//       {
//         path: 'exams/:id/take',
//         loadComponent: () => import('./exam-take/exam-take.component')
//           .then(m => m.ExamTakeComponent)
//       },
//       {
//         path: 'results',
//         loadComponent: () => import('./results/results.component')
//           .then(m => m.ResultsComponent)
//       },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
