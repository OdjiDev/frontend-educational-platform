// src/app/features/student/course-list/course-list-student.component.ts
import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface CourseChapter {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  isCompleted: boolean;
}

@Component({
  selector: 'app-course-list-student',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-list-student.component.html',
  styleUrls: ['./course-list-student.component.css']
})
export class CourseListStudentComponent implements OnInit {
  // Signal pour la recherche
  searchTerm = signal('');

  // Liste des chapitres du programme
  private allChapters: CourseChapter[] = [
    {
      id: 1,
      title: 'Nombres Complexes',
      description: 'Étude des nombres complexes, forme algébrique, trigonométrique, exponentielle, équations dans C.',
      icon: '🔢',
      color: '#667eea',
      progress: 0,
      totalLessons: 8,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 2,
      title: 'Arithmétique',
      description: 'Divisibilité, PGCD, PPCM, nombres premiers, congruences, théorème de Bézout et de Gauss.',
      icon: '📐',
      color: '#f093fb',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Fonctions Numériques',
      description: 'Étude des fonctions : domaine, limites, continuité, dérivabilité, variations, asymptotes.',
      icon: '📈',
      color: '#4facfe',
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 4,
      title: 'Intégration',
      description: 'Calcul intégral, primitives, intégrales définies, techniques d\'intégration, applications.',
      icon: '∫',
      color: '#43e97b',
      progress: 0,
      totalLessons: 7,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 5,
      title: 'Fonctions Spéciales',
      description: 'Logarithme népérien, fonction exponentielle, fonctions puissances, propriétés et applications.',
      icon: '📊',
      color: '#fa709a',
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 6,
      title: 'Suites Numériques',
      description: 'Suites arithmétiques, géométriques, récurrentes, convergence, limites, théorèmes de comparaison.',
      icon: '🔢',
      color: '#a18cd1',
      progress: 0,
      totalLessons: 7,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 7,
      title: 'Équations Différentielles',
      description: 'Équations différentielles du premier et second ordre, solutions, applications physiques.',
      icon: '⚡',
      color: '#fbc2eb',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 8,
      title: 'Probabilités',
      description: 'Calcul des probabilités, variables aléatoires, lois de probabilité, espérance, variance.',
      icon: '🎲',
      color: '#ffecd2',
      progress: 0,
      totalLessons: 8,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 9,
      title: 'Géométrie Plane',
      description: 'Géométrie analytique, droites, cercles, transformations, vecteurs, repères dans le plan.',
      icon: '📐',
      color: '#89f7fe',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 10,
      title: 'Coniques',
      description: 'Étude des coniques : parabole, ellipse, hyperbole, équations réduites, propriétés géométriques.',
      icon: '⭕',
      color: '#f6d365',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      isCompleted: false
    },
    {
      id: 11,
      title: 'Géométrie dans l\'Espace',
      description: 'Géométrie dans l\'espace, plans, droites, sphères, volumes, solides, repères 3D.',
      icon: '🌐',
      color: '#a8edea',
      progress: 0,
      totalLessons: 7,
      completedLessons: 0,
      isCompleted: false
    }
  ];

  // Computed : cours filtrés par recherche
  filteredChapters = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.allChapters;
    return this.allChapters.filter(chapter =>
      chapter.title.toLowerCase().includes(term) ||
      chapter.description.toLowerCase().includes(term)
    );
  });

  // Computed : statistiques globales
  totalChapters = computed(() => this.allChapters.length);
  completedChapters = computed(() => this.allChapters.filter(c => c.isCompleted).length);
  totalLessons = computed(() => this.allChapters.reduce((sum, c) => sum + c.totalLessons, 0));
  completedLessons = computed(() => this.allChapters.reduce((sum, c) => sum + c.completedLessons, 0));
  globalProgress = computed(() => {
    const total = this.totalLessons();
    const completed = this.completedLessons();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  ngOnInit(): void {
    // Simuler un chargement de données (remplacer par appel API)
    // Ici, on peut simuler des progressions pour certains chapitres
    // this.loadProgress();
  }

  // Simuler des données de progression (à remplacer par l'API)
  // loadProgress(): void {
  //   // Exemple : chapitre 1 à 30%, chapitre 2 à 60%, etc.
  // }
}
