import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000'; // Adresse de ton FastAPI

  // 🎯 Signal global pour suivre l'utilisateur connecté dans toute l'application
  currentUser = signal<User | null>(null);

  /**
   * 1. Connexion de l'utilisateur
   * Envoie les identifiants au format x-www-form-urlencoded requis par OAuth2 FastAPI
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    // 💡 CORRECTION : Utilisation de 'username' à la place de 'email' pour correspondre à OAuth2PasswordRequestForm
    const payload = new HttpParams()
      .set('username', credentials.email)
      .set('password', credentials.password);

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(response => localStorage.setItem('token', response.access_token))
    );
  }

  /**
   * 2. Récupération du profil de l'utilisateur connecté
   * Cette méthode met à jour automatiquement le Signal global de l'application
   */
  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`).pipe(
      tap(user => this.currentUser.set(user)) // Met à jour le Signal global
    );
  }

  /**
   * 3. Déconnexion de l'utilisateur
   * Nettoie le token et réinitialise le Signal global à null
   */
  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  /**
   * 4. Récupérer le token brut actuellement stocké
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
