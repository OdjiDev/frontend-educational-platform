// features/student/models/student-results.model.ts
export interface StudentResult {
  id: number;
  exam_id: number;
  exam_title: string;
  course_id: number;
  course_title: string;
  score: number;
  total_points: number;
  percentage: number;
  passed: boolean;
  submitted_at: string;
  graded_at?: string;
  teacher_comment?: string;
}

export interface StudentResultsSummary {
  moyenne_generale: number;
  credits_obtenus: number;
  credits_total: number;
  exams_passes: number;
  exams_total: number;
  results: StudentResult[];
  progression: number;
}

export interface GradeDistribution {
  A: number;   // 90-100%
  B: number;   // 80-89%
  C: number;   // 70-79%
  D: number;   // 60-69%
  F: number;   // < 60%
}
