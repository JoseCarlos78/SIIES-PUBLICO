// Tipos del módulo "Aula" (Classroom demo de SIIES).
// Toda la información vive en localStorage; estos tipos describen su forma.

export type Role = "alumno" | "docente";

export interface User {
  id: string;
  name: string;
  email: string;
  /** Solo demostración: en un backend real nunca se guarda la contraseña en claro. */
  password: string;
  role: Role;
  /** Grupo al que pertenece el alumno, p. ej. "3°A". Vacío para docentes. */
  group: string;
  /** Color de acento para el avatar (clases de Tailwind). */
  avatar: string;
}

/**
 * Materia impartida (curso): la combinación de una asignatura, un grupo y el
 * docente que la imparte. Es la unidad sobre la que se cuelgan las actividades,
 * equivalente a una "clase" de Classroom.
 */
export interface Course {
  id: string;
  subject: string;
  group: string;
  teacherId: string;
  teacherName: string;
  /** Emoji representativo de la materia. */
  icon: string;
  /** Clase de Tailwind para el color de acento de la tarjeta. */
  color: string;
}

export type QuestionType = "abierta" | "opcion" | "booleana";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  /** Opciones cuando el tipo es "opcion". */
  options: string[];
  points: number;
}

export type ActivityType = "tarea" | "formulario";

export interface Activity {
  id: string;
  /** Curso (materia + grupo) al que pertenece la actividad. */
  courseId: string;
  type: ActivityType;
  title: string;
  description: string;
  /** Fecha límite en formato ISO (YYYY-MM-DD). */
  dueDate: string;
  createdBy: string;
  createdByName: string;
  /** Preguntas (solo aplica a los formularios). */
  questions: Question[];
  /** Fecha de creación en ISO. */
  createdAt: string;
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface Submission {
  id: string;
  activityId: string;
  studentId: string;
  studentName: string;
  /** Respuestas a las preguntas (formularios). */
  answers: Answer[];
  /** Respuesta libre (tareas). */
  textResponse: string;
  submittedAt: string;
  /** Calificación asignada por el docente (0-100) o null si no se ha revisado. */
  grade: number | null;
  feedback: string;
}
