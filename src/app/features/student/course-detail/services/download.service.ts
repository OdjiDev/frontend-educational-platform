// src/app/features/student/course-detail/services/download.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * Télécharge un fichier depuis l'API
   * @param resourceId - ID de la ressource
   * @param filename - Nom du fichier (pour la sauvegarde)
   */
  downloadResource(resourceId: number, filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/resources/${resourceId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * Télécharge un fichier avec progression
   */
  downloadResourceWithProgress(resourceId: number, filename: string): Observable<{
    progress: number;
    blob?: Blob;
  }> {
    return new Observable(observer => {
      this.http.get(`${this.apiUrl}/resources/${resourceId}/download`, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event: any) => {
          if (event.type === 1) { // HttpEventType.DownloadProgress
            const progress = Math.round((100 * event.loaded) / event.total);
            observer.next({ progress });
          } else if (event.type === 4) { // HttpEventType.Response
            observer.next({ progress: 100, blob: event.body });
            observer.complete();
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }

  /**
   * Sauvegarde le fichier sur le disque
   */
  saveFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
