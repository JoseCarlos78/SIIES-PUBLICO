"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useAula } from "./AulaProvider";
import type { Activity, Course } from "@/lib/aula/types";

export default function SubmissionsViewer({
  activity,
  course,
  onClose,
}: {
  activity: Activity;
  course: Course;
  onClose: () => void;
}) {
  const { submissions, users, gradeSubmission } = useAula();
  const related = submissions.filter((s) => s.activityId === activity.id);
  const students = users.filter(
    (u) => u.role === "alumno" && u.group === course.group,
  );

  return (
    <Modal title={`Entregas · ${activity.title}`} onClose={onClose}>
      <p className="text-sm text-slate-500">
        {related.length} de {students.length} alumnos han entregado.
      </p>

      {related.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
          Todavía no hay entregas para esta actividad.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {related.map((sub) => (
            <SubmissionRow
              key={sub.id}
              activity={activity}
              submission={sub}
              onGrade={gradeSubmission}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}

function SubmissionRow({
  activity,
  submission,
  onGrade,
}: {
  activity: Activity;
  submission: import("@/lib/aula/types").Submission;
  onGrade: (id: string, grade: number, feedback: string) => void;
}) {
  const [grade, setGrade] = useState(
    submission.grade != null ? String(submission.grade) : "",
  );
  const [feedback, setFeedback] = useState(submission.feedback);
  const [saved, setSaved] = useState(false);

  function save() {
    const value = Math.max(0, Math.min(100, Number(grade) || 0));
    onGrade(submission.id, value, feedback.trim());
    setGrade(String(value));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-slate-900">{submission.studentName}</p>
        {submission.grade != null && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            {submission.grade}/100
          </span>
        )}
      </div>

      {/* Respuestas */}
      <div className="mt-3 space-y-2 text-sm">
        {activity.type === "tarea" ? (
          <p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-slate-700">
            {submission.textResponse || "(Sin texto)"}
          </p>
        ) : (
          activity.questions.map((q, i) => {
            const ans = submission.answers.find((a) => a.questionId === q.id);
            return (
              <div key={q.id} className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">
                  {i + 1}. {q.text}
                </p>
                <p className="mt-1 text-slate-800">
                  {ans?.value || "(Sin respuesta)"}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Calificación */}
      <div className="mt-4 flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-600">
            Calificación
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <input
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Retroalimentación"
          className="mt-1 flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-brand-500"
        />
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {saved ? "Guardado ✓" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
