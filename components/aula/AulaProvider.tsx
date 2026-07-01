"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Activity,
  Course,
  Role,
  Submission,
  User,
} from "@/lib/aula/types";
import {
  SEED_ACTIVITIES,
  SEED_COURSES,
  SEED_SUBMISSIONS,
  SEED_USERS,
} from "@/lib/aula/seed";

const KEYS = {
  version: "siies_aula_version",
  users: "siies_aula_users",
  courses: "siies_aula_courses",
  activities: "siies_aula_activities",
  submissions: "siies_aula_submissions",
  session: "siies_aula_session",
} as const;

// Se incrementa cuando cambia el esquema de los datos demo. Si la versión
// guardada no coincide, se descartan los datos previos y se vuelve a sembrar.
const DATA_VERSION = "2";

type LoginResult = { ok: true } | { ok: false; error: string };

interface AulaContextValue {
  ready: boolean;
  currentUser: User | null;
  users: User[];
  courses: Course[];
  activities: Activity[];
  submissions: Submission[];
  login: (email: string, password: string, role: Role) => LoginResult;
  logout: () => void;
  addActivity: (
    activity: Omit<Activity, "id" | "createdAt" | "createdBy" | "createdByName">,
  ) => void;
  deleteActivity: (id: string) => void;
  saveSubmission: (
    submission: Omit<Submission, "id" | "submittedAt" | "studentId" | "studentName" | "grade" | "feedback">,
  ) => void;
  gradeSubmission: (id: string, grade: number, feedback: string) => void;
}

const AulaContext = createContext<AulaContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function AulaProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Inicializa desde localStorage (sembrando datos demo la primera vez).
  useEffect(() => {
    // Migración: si el esquema cambió, descarta los datos demo previos.
    if (localStorage.getItem(KEYS.version) !== DATA_VERSION) {
      [KEYS.users, KEYS.courses, KEYS.activities, KEYS.submissions].forEach(
        (k) => localStorage.removeItem(k),
      );
      localStorage.setItem(KEYS.version, DATA_VERSION);
    }

    const seededUsers = read<User[]>(KEYS.users, SEED_USERS);
    const seededCourses = read<Course[]>(KEYS.courses, SEED_COURSES);
    const seededActivities = read<Activity[]>(KEYS.activities, SEED_ACTIVITIES);
    const seededSubmissions = read<Submission[]>(
      KEYS.submissions,
      SEED_SUBMISSIONS,
    );
    setUsers(seededUsers);
    setCourses(seededCourses);
    setActivities(seededActivities);
    setSubmissions(seededSubmissions);
    setCurrentUserId(read<string | null>(KEYS.session, null));
    setReady(true);
  }, []);

  // Persiste cada colección cuando cambia (solo después de inicializar).
  useEffect(() => {
    if (ready) localStorage.setItem(KEYS.users, JSON.stringify(users));
  }, [users, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(KEYS.courses, JSON.stringify(courses));
  }, [courses, ready]);
  useEffect(() => {
    if (ready)
      localStorage.setItem(KEYS.activities, JSON.stringify(activities));
  }, [activities, ready]);
  useEffect(() => {
    if (ready)
      localStorage.setItem(KEYS.submissions, JSON.stringify(submissions));
  }, [submissions, ready]);
  useEffect(() => {
    if (ready)
      localStorage.setItem(KEYS.session, JSON.stringify(currentUserId));
  }, [currentUserId, ready]);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? null,
    [users, currentUserId],
  );

  const login = useCallback(
    (email: string, password: string, role: Role): LoginResult => {
      const match = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password &&
          u.role === role,
      );
      if (!match) {
        return {
          ok: false,
          error:
            "Correo, contraseña o tipo de usuario incorrectos. Revisa los datos de acceso de ejemplo.",
        };
      }
      setCurrentUserId(match.id);
      return { ok: true };
    },
    [users],
  );

  const logout = useCallback(() => setCurrentUserId(null), []);

  const addActivity = useCallback<AulaContextValue["addActivity"]>(
    (activity) => {
      if (!currentUser) return;
      const next: Activity = {
        ...activity,
        id: genId("act"),
        createdAt: new Date().toISOString(),
        createdBy: currentUser.id,
        createdByName: currentUser.name,
      };
      setActivities((prev) => [next, ...prev]);
    },
    [currentUser],
  );

  const deleteActivity = useCallback((id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    setSubmissions((prev) => prev.filter((s) => s.activityId !== id));
  }, []);

  const saveSubmission = useCallback<AulaContextValue["saveSubmission"]>(
    (submission) => {
      if (!currentUser) return;
      setSubmissions((prev) => {
        const existingIndex = prev.findIndex(
          (s) =>
            s.activityId === submission.activityId &&
            s.studentId === currentUser.id,
        );
        const record: Submission = {
          ...submission,
          id: existingIndex >= 0 ? prev[existingIndex].id : genId("sub"),
          submittedAt: new Date().toISOString(),
          studentId: currentUser.id,
          studentName: currentUser.name,
          grade: existingIndex >= 0 ? prev[existingIndex].grade : null,
          feedback: existingIndex >= 0 ? prev[existingIndex].feedback : "",
        };
        if (existingIndex >= 0) {
          const copy = [...prev];
          copy[existingIndex] = record;
          return copy;
        }
        return [record, ...prev];
      });
    },
    [currentUser],
  );

  const gradeSubmission = useCallback(
    (id: string, grade: number, feedback: string) => {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, grade, feedback } : s)),
      );
    },
    [],
  );

  const value: AulaContextValue = {
    ready,
    currentUser,
    users,
    courses,
    activities,
    submissions,
    login,
    logout,
    addActivity,
    deleteActivity,
    saveSubmission,
    gradeSubmission,
  };

  return <AulaContext.Provider value={value}>{children}</AulaContext.Provider>;
}

export function useAula(): AulaContextValue {
  const ctx = useContext(AulaContext);
  if (!ctx) {
    throw new Error("useAula debe usarse dentro de <AulaProvider>");
  }
  return ctx;
}
