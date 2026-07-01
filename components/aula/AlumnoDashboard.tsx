"use client";

import { useState } from "react";
import { useAula } from "./AulaProvider";
import ActivityResponder from "./ActivityResponder";
import { dueLabel, formatDate } from "@/lib/aula/format";
import type { Activity, Course, Submission, User } from "@/lib/aula/types";

type Status = "pendiente" | "entregada" | "calificada";

function statusOf(sub: Submission | undefined): Status {
  if (!sub) return "pendiente";
  return sub.grade != null ? "calificada" : "entregada";
}

const STATUS_STYLE: Record<Status, string> = {
  pendiente: "bg-amber-50 text-amber-700",
  entregada: "bg-brand-50 text-brand-700",
  calificada: "bg-emerald-50 text-emerald-700",
};

export default function AlumnoDashboard() {
  const { currentUser, courses } = useAula();
  const student = currentUser as User;
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const myCourses = courses.filter((c) => c.group === student.group);
  const selectedCourse =
    myCourses.find((c) => c.id === selectedCourseId) ?? null;

  // Nivel 2: actividades de la materia seleccionada.
  if (selectedCourse) {
    return (
      <CourseActivities
        course={selectedCourse}
        student={student}
        onBack={() => setSelectedCourseId(null)}
      />
    );
  }

  // Nivel 1: materias del alumno.
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Hola, {student.name.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Estas son tus materias del grupo {student.group}. Entra a una para ver
        sus actividades.
      </p>

      {myCourses.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
          Todavía no tienes materias asignadas.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((course) => (
            <CourseTile
              key={course.id}
              course={course}
              student={student}
              onClick={() => setSelectedCourseId(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function CourseTile({
  course,
  student,
  onClick,
}: {
  course: Course;
  student: User;
  onClick: () => void;
}) {
  const { activities, submissions } = useAula();
  const list = activities.filter((a) => a.courseId === course.id);
  const subFor = (activityId: string) =>
    submissions.find(
      (s) => s.activityId === activityId && s.studentId === student.id,
    );
  const pending = list.filter((a) => !subFor(a.id)).length;
  const graded = list
    .map((a) => subFor(a.id))
    .filter((s): s is Submission => !!s && s.grade != null);
  const average =
    graded.length > 0
      ? Math.round(graded.reduce((sum, s) => sum + (s.grade ?? 0), 0) / graded.length)
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl text-white ${course.color}`}
        >
          {course.icon}
        </span>
        {pending > 0 ? (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            {pending} pendiente{pending === 1 ? "" : "s"}
          </span>
        ) : (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Al día
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {course.subject}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{course.teacherName}</p>
      <p className="mt-3 text-xs text-slate-400">
        {list.length} actividad{list.length === 1 ? "" : "es"}
        {average != null && ` · Promedio ${average}`}
      </p>
    </button>
  );
}

function CourseActivities({
  course,
  student,
  onBack,
}: {
  course: Course;
  student: User;
  onBack: () => void;
}) {
  const { activities, submissions } = useAula();
  const [active, setActive] = useState<Activity | null>(null);

  const list = activities
    .filter((a) => a.courseId === course.id)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const subFor = (activityId: string) =>
    submissions.find(
      (s) => s.activityId === activityId && s.studentId === student.id,
    );

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-1 text-sm">
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Mis materias
        </button>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-700">{course.subject}</span>
      </nav>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${course.color}`}
        >
          {course.icon}
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {course.subject}
          </h1>
          <p className="text-sm text-slate-600">{course.teacherName}</p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-3 text-sm font-medium text-slate-700">
            No tienes actividades en esta materia por ahora.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {list.map((activity) => {
            const sub = subFor(activity.id);
            const status = statusOf(sub);
            const due = dueLabel(activity.dueDate);
            return (
              <button
                key={activity.id}
                type="button"
                onClick={() => setActive(activity)}
                className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
                  {activity.type === "formulario" ? "📝" : "📄"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {activity.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[status]}`}
                    >
                      {status === "calificada"
                        ? `Calificada · ${sub?.grade}/100`
                        : status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Fecha límite: {formatDate(activity.dueDate)}
                  </p>
                </div>
                {status === "pendiente" && (
                  <span
                    className={`hidden flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium sm:block ${due.tone}`}
                  >
                    {due.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {active && (
        <ActivityResponder
          activity={active}
          existing={subFor(active.id) ?? null}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
