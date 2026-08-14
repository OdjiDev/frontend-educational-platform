// src/app/features/student/course-detail/course-detail-student.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DownloadService } from './services/download.service';

// ============================================================
// INTERFACES
// ============================================================
export interface ChapterLesson {
  id: number;
  title: string;
  type: 'cours' | 'exercice' | 'ressource' | 'video';
  duration: string;
  isCompleted: boolean;
  content?: string;
  url?: string;
  resourceId?: number;
  filename?: string;
  fileSize?: number;
  uploadedAt?: string;
}

export interface ExamSummary {
  id: number;
  title: string;
  date: string;
  duration: number;
  totalPoints: number;
  isCompleted: boolean;
  score?: number;
}

export interface ChapterDetail {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  lessons: ChapterLesson[];
  totalLessons: number;
  completedLessons: number;
  isCompleted: boolean;
  examens?: ExamSummary[];
}

// ============================================================
// COMPOSANT
// ============================================================
@Component({
  selector: 'app-course-detail-student',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-detail-student.component.html',
  styleUrls: ['./course-detail-student.component.css']
})
export class CourseDetailStudentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private downloadService = inject(DownloadService);

  // ============================================================
  // SIGNAUX
  // ============================================================
  chapter = signal<ChapterDetail | null>(null);
  isLoading = signal(true);
  activeTab = signal<'cours' | 'exercices' | 'ressources' | 'examens'>('cours');

  downloading = signal<Record<number, boolean>>({});
  downloadProgress = signal<Record<number, number>>({});

  // ============================================================
  // COMPUTED
  // ============================================================
  coursLessons = computed(() => {
    return this.chapter()?.lessons?.filter(l => l.type === 'cours') || [];
  });

  exerciceLessons = computed(() => {
    return this.chapter()?.lessons?.filter(l => l.type === 'exercice') || [];
  });

  resourceLessons = computed(() => {
    return this.chapter()?.lessons?.filter(l => l.type === 'ressource' || l.type === 'video') || [];
  });

  // ============================================================
  // CYCLE DE VIE
  // ============================================================
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID du chapitre :', id);
    if (id) {
      this.loadChapterDetail(id);
    } else {
      this.router.navigate(['/student/courses']);
    }
  }

  // ============================================================
  // MÉTHODES DE CHARGEMENT
  // ============================================================
  loadChapterDetail(id: number): void {
    this.isLoading.set(true);
    setTimeout(() => {
      const chapterData = this.getChapterData(id);
      if (chapterData) {
        this.chapter.set(chapterData);
        console.log('Chapitre chargé :', chapterData);
      } else {
        console.error('Chapitre non trouvé pour l\'ID :', id);
        this.router.navigate(['/student/courses']);
      }
      this.isLoading.set(false);
    }, 300);
  }

  private getChapterData(id: number): ChapterDetail | null {
    const chapters: Record<number, ChapterDetail> = {
      1: {
        id: 1,
        title: 'Nombres Complexes',
        description: 'Étude des nombres complexes, forme algébrique, trigonométrique, exponentielle, équations dans C.',
        icon: '🔢',
        color: '#667eea',
        progress: 45,
        totalLessons: 8,
        completedLessons: 3,
        isCompleted: false,
        lessons: [
          { id: 1, title: 'Introduction aux nombres complexes', type: 'cours', duration: '15 min', isCompleted: true },
          { id: 2, title: 'Forme algébrique et opérations', type: 'cours', duration: '20 min', isCompleted: true },
          { id: 3, title: 'Module et argument', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 4, title: 'Forme trigonométrique', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 5, title: 'Forme exponentielle', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 6, title: 'Équations dans C', type: 'exercice', duration: '25 min', isCompleted: false },
          { id: 7, title: 'Exercices corrigés', type: 'exercice', duration: '30 min', isCompleted: false },
          {
            id: 8,
            title: 'Résumé du chapitre',
            type: 'ressource',
            duration: '10 min',
            isCompleted: false,
            resourceId: 101,
            filename: 'resume-nombres-complexes.pdf',
            fileSize: 245760,
            uploadedAt: '2025-01-10'
          }
        ],
        examens: [
          { id: 1, title: 'Devoir sur les nombres complexes', date: '15/01/2025', duration: 60, totalPoints: 20, isCompleted: false }
        ]
      },
      2: {
        id: 2,
        title: 'Arithmétique',
        description: 'Divisibilité, PGCD, PPCM, nombres premiers, congruences, théorème de Bézout et de Gauss.',
        icon: '📐',
        color: '#f093fb',
        progress: 20,
        totalLessons: 6,
        completedLessons: 1,
        isCompleted: false,
        lessons: [
          { id: 9, title: 'Divisibilité dans Z', type: 'cours', duration: '15 min', isCompleted: true },
          { id: 10, title: 'PGCD et PPCM', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 11, title: 'Nombres premiers', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 12, title: 'Congruences', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 13, title: 'Exercices corrigés', type: 'exercice', duration: '25 min', isCompleted: false },
          {
            id: 14,
            title: 'Fiche récapitulative',
            type: 'ressource',
            duration: '10 min',
            isCompleted: false,
            resourceId: 102,
            filename: 'fiche-arithmetique.pdf',
            fileSize: 180000,
            uploadedAt: '2025-01-12'
          }
        ],
        examens: [
          { id: 2, title: 'Devoir sur l\'arithmétique', date: '20/01/2025', duration: 60, totalPoints: 20, isCompleted: false }
        ]
      },
      3: {
        id: 3,
        title: 'Fonctions Numériques',
        description: 'Étude des fonctions : domaine, limites, continuité, dérivabilité, variations, asymptotes.',
        icon: '📈',
        color: '#4facfe',
        progress: 0,
        totalLessons: 10,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 15, title: 'Généralités sur les fonctions', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 16, title: 'Limites et continuité', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 17, title: 'Dérivabilité', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 18, title: 'Étude de fonctions', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 19, title: 'Exercices corrigés', type: 'exercice', duration: '25 min', isCompleted: false },
          {
            id: 20,
            title: 'Formulaire des dérivées',
            type: 'ressource',
            duration: '5 min',
            isCompleted: false,
            resourceId: 103,
            filename: 'formulaire-derivees.pdf',
            fileSize: 120000,
            uploadedAt: '2025-01-15'
          }
        ],
        examens: []
      },
      4: {
        id: 4,
        title: 'Intégration',
        description: 'Calcul intégral, primitives, intégrales définies, techniques d\'intégration, applications.',
        icon: '∫',
        color: '#43e97b',
        progress: 0,
        totalLessons: 7,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 21, title: 'Primitives', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 22, title: 'Intégrales définies', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 23, title: 'Techniques d\'intégration', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 24, title: 'Applications des intégrales', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 25, title: 'Exercices corrigés', type: 'exercice', duration: '25 min', isCompleted: false },
          {
            id: 26,
            title: 'Tableau des primitives',
            type: 'ressource',
            duration: '5 min',
            isCompleted: false,
            resourceId: 104,
            filename: 'tableau-primitives.pdf',
            fileSize: 95000,
            uploadedAt: '2025-01-18'
          }
        ],
        examens: []
      },
      5: {
        id: 5,
        title: 'Fonctions Spéciales',
        description: 'Logarithme népérien, fonction exponentielle, fonctions puissances, propriétés et applications.',
        icon: '📊',
        color: '#fa709a',
        progress: 0,
        totalLessons: 9,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 27, title: 'Logarithme népérien', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 28, title: 'Fonction exponentielle', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 29, title: 'Fonctions puissances', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 30, title: 'Propriétés et applications', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 31, title: 'Exercices corrigés', type: 'exercice', duration: '25 min', isCompleted: false }
        ],
        examens: []
      },
      6: {
        id: 6,
        title: 'Suites Numériques',
        description: 'Suites arithmétiques, géométriques, récurrentes, convergence, limites, théorèmes de comparaison.',
        icon: '🔢',
        color: '#a18cd1',
        progress: 0,
        totalLessons: 7,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 32, title: 'Généralités sur les suites', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 33, title: 'Suites arithmétiques et géométriques', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 34, title: 'Limites de suites', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 35, title: 'Théorèmes de comparaison', type: 'cours', duration: '22 min', isCompleted: false }
        ],
        examens: []
      },
      7: {
        id: 7,
        title: 'Équations Différentielles',
        description: 'Équations différentielles du premier et second ordre, solutions, applications physiques.',
        icon: '⚡',
        color: '#fbc2eb',
        progress: 0,
        totalLessons: 6,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 36, title: 'Équations différentielles du 1er ordre', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 37, title: 'Équations différentielles du 2nd ordre', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 38, title: 'Applications physiques', type: 'cours', duration: '18 min', isCompleted: false }
        ],
        examens: []
      },
      8: {
        id: 8,
        title: 'Probabilités',
        description: 'Calcul des probabilités, variables aléatoires, lois de probabilité, espérance, variance.',
        icon: '🎲',
        color: '#ffecd2',
        progress: 0,
        totalLessons: 8,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 39, title: 'Calcul des probabilités', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 40, title: 'Variables aléatoires', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 41, title: 'Lois de probabilité', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 42, title: 'Espérance et variance', type: 'cours', duration: '22 min', isCompleted: false },
          { id: 43, title: 'Exercices corrigés', type: 'exercice', duration: '25 min', isCompleted: false }
        ],
        examens: []
      },
      9: {
        id: 9,
        title: 'Géométrie Plane',
        description: 'Géométrie analytique, droites, cercles, transformations, vecteurs, repères dans le plan.',
        icon: '📐',
        color: '#89f7fe',
        progress: 0,
        totalLessons: 6,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 44, title: 'Géométrie analytique', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 45, title: 'Droites et cercles', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 46, title: 'Transformations', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 47, title: 'Vecteurs et repères', type: 'cours', duration: '22 min', isCompleted: false }
        ],
        examens: []
      },
      10: {
        id: 10,
        title: 'Coniques',
        description: 'Étude des coniques : parabole, ellipse, hyperbole, équations réduites, propriétés géométriques.',
        icon: '⭕',
        color: '#f6d365',
        progress: 0,
        totalLessons: 6,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 48, title: 'Parabole', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 49, title: 'Ellipse', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 50, title: 'Hyperbole', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 51, title: 'Équations réduites', type: 'cours', duration: '22 min', isCompleted: false }
        ],
        examens: []
      },
      11: {
        id: 11,
        title: 'Géométrie dans l\'Espace',
        description: 'Géométrie dans l\'espace, plans, droites, sphères, volumes, solides, repères 3D.',
        icon: '🌐',
        color: '#a8edea',
        progress: 0,
        totalLessons: 7,
        completedLessons: 0,
        isCompleted: false,
        lessons: [
          { id: 52, title: 'Géométrie 3D', type: 'cours', duration: '15 min', isCompleted: false },
          { id: 53, title: 'Plans et droites dans l\'espace', type: 'cours', duration: '20 min', isCompleted: false },
          { id: 54, title: 'Sphères et volumes', type: 'cours', duration: '18 min', isCompleted: false },
          { id: 55, title: 'Repères 3D', type: 'cours', duration: '22 min', isCompleted: false }
        ],
        examens: []
      }
    };

    return chapters[id] || null;
  }

  // ============================================================
  // MÉTHODES UTILITAIRES
  // ============================================================
  getProgressPercentage(): number {
    const chapter = this.chapter();
    if (!chapter) return 0;
    return chapter.totalLessons > 0 ? Math.round((chapter.completedLessons / chapter.totalLessons) * 100) : 0;
  }

  toggleLessonCompletion(lesson: ChapterLesson): void {
    const chapter = this.chapter();
    if (!chapter) return;
    lesson.isCompleted = !lesson.isCompleted;
    chapter.completedLessons = chapter.lessons.filter(l => l.isCompleted).length;
    chapter.progress = Math.round((chapter.completedLessons / chapter.totalLessons) * 100);
    chapter.isCompleted = chapter.completedLessons === chapter.totalLessons;
    this.chapter.set({ ...chapter });
  }

  setTab(tab: 'cours' | 'exercices' | 'ressources' | 'examens'): void {
    this.activeTab.set(tab);
  }

  goBack(): void {
    this.router.navigate(['/student/courses']);
  }

  // ============================================================
  // FORMATAGE DE LA TAILLE DES FICHIERS
  // ============================================================
  formatFileSize(bytes: number | undefined | null): string {
    if (!bytes || bytes === 0) return '0 o';
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    return `${size.toFixed(1)} ${units[i]}`;
  }

  // ============================================================
  // TÉLÉCHARGEMENT
  // ============================================================
  downloadFile(lesson: ChapterLesson): void {
    if (!lesson.resourceId) {
      console.error('Aucun ID de ressource pour la leçon :', lesson.title);
      alert('Aucun fichier disponible pour cette ressource.');
      return;
    }

    console.log('Téléchargement du fichier :', lesson.filename, 'ID:', lesson.resourceId);

    // Marquer le téléchargement en cours
    this.downloading.update(d => ({ ...d, [lesson.id]: true }));
    this.downloadProgress.update(p => ({ ...p, [lesson.id]: 0 }));

    this.downloadService.downloadResourceWithProgress(lesson.resourceId, lesson.filename || lesson.title)
      .subscribe({
        next: (event: any) => {
          if (event.progress < 100) {
            this.downloadProgress.update(p => ({ ...p, [lesson.id]: event.progress }));
          }
          if (event.blob) {
            this.downloadService.saveFile(event.blob, lesson.filename || lesson.title);
            this.downloading.update(d => ({ ...d, [lesson.id]: false }));
            this.downloadProgress.update(p => ({ ...p, [lesson.id]: 0 }));
          }
        },
        error: (err) => {
          console.error('Erreur de téléchargement', err);
          this.downloading.update(d => ({ ...d, [lesson.id]: false }));
          alert('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
        }
      });
  }

  isDownloading(lessonId: number): boolean {
    return this.downloading()[lessonId] || false;
  }

  getDownloadProgress(lessonId: number): number {
    return this.downloadProgress()[lessonId] || 0;
  }
}