// features/student/models/enrollment.model.ts
import { Course } from '../../../shared/models/course.model';
import { User } from '../../../shared/models/user.model';

export interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  date_inscription: string;
  statut: 'pending' | 'active' | 'completed' | 'dropped';
  progression: number;           // 0 à 100
  note_finale?: number;
  course?: Course;
  student?: User;
}

export interface EnrollmentCreate {
  course_id: number;
}

export interface EnrollmentUpdate {
  statut?: 'pending' | 'active' | 'completed' | 'dropped';
  progression?: number;
  note_finale?: number;
}
