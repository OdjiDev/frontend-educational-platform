// src/app/features/courses/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, map, lastValueFrom } from 'rxjs';
import { Course, CourseCreate, CourseUpdate, CourseResource } from '../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8000/courses';

  constructor(private http: HttpClient) {}

  // Récupérer tous les cours (pour étudiants)
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/student`);
  }

  // Récupérer un cours avec ses ressources
  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}/student`);
  }

  // Télécharger un fichier (méthode 1 : via Blob)
  downloadResource(resourceId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/resources/${resourceId}/download`, {
      responseType: 'blob'
    });
  }

  // Télécharger avec suivi de progression (méthode 2)
  downloadResourceWithProgress(resourceId: number): Observable<HttpEvent<Blob>> {
    const req = new HttpRequest('GET', `${this.apiUrl}/resources/${resourceId}/download`, {
      responseType: 'blob',
      reportProgress: true
    });
    return this.http.request(req);
  }

  // Obtenir l'URL de téléchargement directe (pour utiliser l'attribut download)
  getDownloadUrl(resourceId: number): string {
    return `${this.apiUrl}/resources/${resourceId}/download`;
  }

  // Télécharger plusieurs ressources à la fois (ZIP)
  downloadMultipleResources(resourceIds: number[]): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/resources/download-zip`,
      { resource_ids: resourceIds },
      { responseType: 'blob' }
    );
  }

  // Pour les profs/admins : upload de ressources
  uploadResource(courseId: number, file: File): Observable<CourseResource> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CourseResource>(`${this.apiUrl}/${courseId}/resources`, formData);
  }

  // Supprimer une ressource
  deleteResource(resourceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/resources/${resourceId}`);
  }

  // Méthodes CRUD existantes...
  createCourse(course: CourseCreate): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: CourseUpdate): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
