// features/student/dashboard/dashboard-student.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { StudentProfile } from '../models/student-profile.model';
import { Course } from '../../../shared/models/course.model';
import { StudentResultsSummary } from '../models/student-results.model';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  private authService = inject(AuthService);

  // Signaux pour l'état
  student = signal<StudentProfile | null>(null);
  recentCourses = signal<Course[]>([]);
  resultsSummary = signal<StudentResultsSummary | null>(null);
  isLoading = signal(true);

  // Computed : nombre de cours en cours
  activeCoursesCount = computed(() => {
    return this.recentCourses().length;
  });

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading.set(true);

    // Simuler le chargement des données (remplacer par des appels API réels)
    setTimeout(() => {
      // Récupérer l'utilisateur connecté
      const user = this.authService.currentUser();
      if (user) {
        this.student.set(user as StudentProfile);
      }

      // Simuler des cours récents
      // this.recentCourses.set([
      //   {
      //     id: 1,
      //     title: 'Développement Web',
      //     description: 'Apprendre à créer des applications web modernes',
      //     teacher_id: 1,
      //     teacher_name: 'Dr. Martin'
      //   },
      //   {
      //     id: 2,
      //     title: 'Base de données',
      //     description: 'SQL et conception de bases de données',
      //     teacher_id: 2,
      //     teacher_name: 'Prof. Durand'
      //   }
      // ]);

      // Simuler les résultats
      this.resultsSummary.set({
        moyenne_generale: 15.5,
        credits_obtenus: 120,
        credits_total: 180,
        exams_passes: 12,
        exams_total: 14,
        progression: 67,
        results: []
      });

      this.isLoading.set(false);
    }, 500);
  }
}
