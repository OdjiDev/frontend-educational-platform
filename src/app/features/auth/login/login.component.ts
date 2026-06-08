// src/app/features/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor() {
    // Initialisation et validation du formulaire
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Appel au service d'authentification lié à FastAPI
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // Une fois connecté, on demande le profil pour aiguiller l'utilisateur selon son rôle
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            this.isLoading = false;
            if (user.role === 'admin') {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/student-courses']);
            }
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = "Impossible de récupérer le profil utilisateur.";
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        // Gestion propre de l'erreur d'identifiants
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = "Email ou mot de passe incorrect.";
        } else {
          this.errorMessage = "Une erreur technique est survenue. Veuillez réessayer plus tard.";
        }
      }
    });
  }
}