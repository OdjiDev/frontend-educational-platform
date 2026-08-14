// features/student/models/student-profile.model.ts
import { User } from '../../../shared/models/user.model';

export interface StudentProfile extends User {
  // Données spécifiques à l'étudiant
  niveau: 'L1' | 'L2' | 'L3' | 'M1' | 'M2' | 'M3' | 'Doctorat';
  filiere: string;
  groupe_td?: string;
  groupe_tp?: string;
  moyenne: number;
  credits_obtenus: number;
  credits_total: number;
  date_inscription: string;
  parrain_id?: number;
  parrain_nom?: string;
  tuteur_id?: number;
  tuteur_nom?: string;
}

// Version simplifiée pour les listes
export interface StudentSummary {

  id: number;
  nom: string;
  prenom: string;
  email: string;
  niveau: string;
  filiere: string;
  photo_profil?: string;
  moyenne: number;
}
