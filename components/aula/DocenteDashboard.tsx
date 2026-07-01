"use client";

import { useState } from "react";
import { useAula } from "./AulaProvider";
import ActivityCreator from "./ActivityCreator";
import SubmissionsViewer from "./SubmissionsViewer";
import { dueLabel, formatDate } from "@/lib/aula/format";
import type { Activity, Course, User } from "@/lib/aula/types";

export default function DocenteDashboard() {
  const { currentUser, courses } = useAula();
  const teacher = currentUser as User;

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const myCourses = courses.filter((c) => c.teacherId === teacher.id);
  const subjects = [...new Set(myCourses.map((c) => c.subject))];

  const selectedCourse =
    myCourses.find((c) => c.id === selectedCourseId) ?? null;

  // Nivel 3: actividades de un curso (materia + grupo).
  if (selectedCourse) {
    return (
      <CourseView
        course={selectedCourse}
        onBack={() => setSelectedCourseId(null)}
        crumbs={[
          { label: "Mis materias", onClick: () => setSelectedSubject(null) },
          {
            label: selectedCourse.subject,
            onClick: () => setSelectedCourseId(null),
          },
          { label: selectedCourse.group },
        ]}
      />
    );
  }

  // Nivel 2: grupos de la materia seleccionada.
  if (selectedSubject) {
    const groups = myCourses.filter((c) => c.subject === selectedSubject);
    return (
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "Mis materias", onClick: () => setSelectedSubject(null) },
            { label: selectedSubject },
          ]}
        />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          {selectedSubject}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Selecciona un grupo para gestionar sus actividades.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((course) => (
            <CourseSummaryCard
              key={course.id}
              course={course}
              onClick={() => setSelectedCourseId(course.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Nivel 1: materias que imparte el docente.
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Hola, {teacher.name.replace(/^Prof\.\s*/i, "")}
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Estas son las materias que impartes. Entra a una para ver sus grupos.
      </p>

      {subjects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
          Aún no tienes materias asignadas.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const group = myCourses.filter((c) => c.subject === subject);
            const sample = group[0];
            return (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${sample.color}/10`}
                >
                  {sample.icon}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  {subject}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {group.length} grupo{group.length === 1 ? "" : "s"} ·{" "}
                  {group.map((c) => c.group).join(", ")}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

type Crumb = { label: string; onClick?: () => void };

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {c.onClick && !last ? (
              <button
                type="button"
                onClick={c.onClick}
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                {c.label}
              </button>
            ) : (
              <span
                className={last ? "font-semibold text-slate-700" : "text-slate-500"}
              >
                {c.label}
              </span>
            )}
            {!last && <span className="text-slate-300">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

function CourseSummaryCard({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) {
  const { activities, submissions } = useAula();
  const courseActivities = activities.filter((a) => a.courseId === course.id);
  const pending = submissions.filter(
    (s) =>
      courseActivities.some((a) => a.id === s.activityId) && s.grade == null,
  ).length;

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
        {pending > 0 && (
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            {pending} por calificar
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {course.group}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {courseActivities.length} actividad
        {courseActivities.length === 1 ? "" : "es"}
      </p>
    </button>
  );
}

function CourseView({
  course,
  onBack,
  crumbs,
}: {
  course: Course;
  onBack: () => void;
  crumbs: Crumb[];
}) {
  const { activities, submissions, deleteActivity } = useAula();
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState<Activity | null>(null);

  const list = activities
    .filter((a) => a.courseId === course.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${course.color}`}
          >
            {course.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {course.subject}
            </h1>
            <p className="text-sm text-slate-600">Grupo {course.group}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            ← Grupos
          </button>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            + Nueva actividad
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-3xl">🗂️</p>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Aún no hay actividades en este grupo.
          </p>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Crear la primera
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {list.map((activity) => {
            const count = submissions.filter(
              (s) => s.activityId === activity.id,
            ).length;
            const due = dueLabel(activity.dueDate);
            return (
              <div
                key={activity.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {activity.type === "formulario" ? "Formulario" : "Tarea"}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${due.tone}`}>
                    {due.text}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">
                  {activity.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {activity.description || "Sin instrucciones."}
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  Fecha límite: {formatDate(activity.dueDate)}
                  {activity.type === "formulario" &&
                    ` · ${activity.questions.length} preguntas`}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-medium text-slate-700">
                    {count} entrega{count === 1 ? "" : "s"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setViewing(activity)}
                      className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                    >
                      Ver entregas
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(`¿Eliminar "${activity.title}" y sus entregas?`)
                        ) {
                          deleteActivity(activity.id);
                        }
                      }}
                      className="rounded-lg px-2 py-1.5 text-xs font-medium text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {creating && (
        <ActivityCreator course={course} onClose={() => setCreating(false)} />
      )}
      {viewing && (
        <SubmissionsViewer
          activity={viewing}
          course={course}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}
