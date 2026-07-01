// Datos de ejemplo que se cargan la primera vez que se abre el módulo Aula.
// Permiten probar el flujo completo (docente y alumno) sin backend.

import type { Activity, Course, Submission, User } from "./types";

export const SEED_USERS: User[] = [
  {
    id: "doc-1",
    name: "Prof. María López",
    email: "maria@siies.app",
    password: "docente123",
    role: "docente",
    group: "",
    avatar: "bg-brand-600",
  },
  {
    id: "doc-2",
    name: "Prof. Carlos Méndez",
    email: "carlos@siies.app",
    password: "docente123",
    role: "docente",
    group: "",
    avatar: "bg-emerald-600",
  },
  {
    id: "alu-1",
    name: "Juan Pérez",
    email: "juan@siies.app",
    password: "alumno123",
    role: "alumno",
    group: "3°A",
    avatar: "bg-amber-500",
  },
  {
    id: "alu-2",
    name: "Ana Torres",
    email: "ana@siies.app",
    password: "alumno123",
    role: "alumno",
    group: "3°A",
    avatar: "bg-rose-500",
  },
  {
    id: "alu-3",
    name: "Luis Ramírez",
    email: "luis@siies.app",
    password: "alumno123",
    role: "alumno",
    group: "3°B",
    avatar: "bg-violet-500",
  },
];

// Materias impartidas. La Prof. María imparte 2 materias (una en 2 grupos);
// el Prof. Carlos imparte 1. Cada combinación materia+grupo es un curso.
export const SEED_COURSES: Course[] = [
  {
    id: "cur-mat-3a",
    subject: "Matemáticas",
    group: "3°A",
    teacherId: "doc-1",
    teacherName: "Prof. María López",
    icon: "📐",
    color: "bg-brand-600",
  },
  {
    id: "cur-mat-3b",
    subject: "Matemáticas",
    group: "3°B",
    teacherId: "doc-1",
    teacherName: "Prof. María López",
    icon: "📐",
    color: "bg-brand-600",
  },
  {
    id: "cur-fis-3a",
    subject: "Física",
    group: "3°A",
    teacherId: "doc-1",
    teacherName: "Prof. María López",
    icon: "🔬",
    color: "bg-cyan-600",
  },
  {
    id: "cur-his-3a",
    subject: "Historia",
    group: "3°A",
    teacherId: "doc-2",
    teacherName: "Prof. Carlos Méndez",
    icon: "📜",
    color: "bg-amber-600",
  },
];

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    courseId: "cur-mat-3a",
    type: "formulario",
    title: "Cuestionario: Ecuaciones de primer grado",
    description:
      "Resuelve el siguiente cuestionario para repasar lo visto en clase. Tienes un solo intento.",
    dueDate: "2026-07-10",
    createdBy: "doc-1",
    createdByName: "Prof. María López",
    createdAt: "2026-06-25T10:00:00.000Z",
    questions: [
      {
        id: "q-1",
        text: "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
        type: "opcion",
        options: ["x = 2", "x = 3", "x = 4", "x = 5"],
        points: 25,
      },
      {
        id: "q-2",
        text: "Una ecuación de primer grado siempre tiene una sola solución.",
        type: "booleana",
        options: [],
        points: 25,
      },
      {
        id: "q-3",
        text: "Explica con tus palabras qué significa despejar una incógnita.",
        type: "abierta",
        options: [],
        points: 50,
      },
    ],
  },
  {
    id: "act-2",
    courseId: "cur-his-3a",
    type: "tarea",
    title: "Ensayo: La Revolución Mexicana",
    description:
      "Escribe un ensayo de mínimo 300 palabras sobre las causas de la Revolución Mexicana. Entrégalo en el recuadro de respuesta.",
    dueDate: "2026-07-05",
    createdBy: "doc-2",
    createdByName: "Prof. Carlos Méndez",
    createdAt: "2026-06-26T15:30:00.000Z",
    questions: [],
  },
  {
    id: "act-3",
    courseId: "cur-fis-3a",
    type: "tarea",
    title: "Práctica: Caída libre",
    description:
      "Calcula el tiempo de caída de un objeto desde 20 m y describe el procedimiento.",
    dueDate: "2026-07-12",
    createdBy: "doc-1",
    createdByName: "Prof. María López",
    createdAt: "2026-06-27T09:00:00.000Z",
    questions: [],
  },
];

export const SEED_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    activityId: "act-2",
    studentId: "alu-2",
    studentName: "Ana Torres",
    answers: [],
    textResponse:
      "La Revolución Mexicana fue resultado de la desigualdad social, la concentración de la tierra y la falta de libertades políticas durante el porfiriato...",
    submittedAt: "2026-06-28T18:00:00.000Z",
    grade: 95,
    feedback: "Excelente análisis de las causas. Cuida la ortografía.",
  },
];
