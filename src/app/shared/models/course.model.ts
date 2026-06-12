
// src/app/features/courses/models/course.model.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  teacher_name?: string;
  teacher_email?: string;
  resources?: CourseResource[];  // NOUVEAU : ressources téléchargeables
  created_at: string;
  updated_at: string;
}

export interface CourseResource {
  id: number;
  filename: string;
  original_name: string;
  file_size: number;
  file_type: string;
  download_url: string;
  uploaded_at: string;
}

export interface CourseCreate {
  title: string;
  description: string;
}

export interface CourseUpdate {
  title?: string;
  description?: string;
}

// NOUVEAU : pour le suivi des téléchargements
export interface DownloadProgress {
  courseId: number;
  resourceId: number;
  filename: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
}
