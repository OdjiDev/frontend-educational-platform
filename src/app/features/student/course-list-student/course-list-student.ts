// src/app/features/courses/pages/course-list-student/course-list-student.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-list-student',
  templateUrl: './course-list-student.component.html',
  styleUrls: ['./course-list-student.component.css']
})
export class CourseListStudentComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement cours', err);
        this.isLoading = false;
      }
    });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.teacher_name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getResourceCount(course: Course): number {
    return course.resources?.length || 0;
  }

  getTotalFileSize(course: Course): string {
    const totalBytes = course.resources?.reduce((sum, r) => sum + (r.file_size || 0), 0) || 0;
    if (totalBytes === 0) return '0 Ko';
    if (totalBytes < 1024 * 1024) return `${Math.round(totalBytes / 1024)} Ko`;
    return `${(totalBytes / (1024 * 1024)).toFixed(1)} Mo`;
  }
}
