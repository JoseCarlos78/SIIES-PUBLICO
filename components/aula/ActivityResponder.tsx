"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useAula } from "./AulaProvider";
import type { Activity, Answer, Submission } from "@/lib/aula/types";

export default function ActivityResponder({
  activity,
  existing,
  onClose,
}: {
  activity: Activity;
  existing: Submission | null;
  onClose: () => void;
}) {
  const { saveSubmission } = useAula();
  const graded = existing?.grade != null;

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    existing?.answers.forEach((a) => {
      initial[a.questionId] = a.value;
    });
    return initial;
  });
  const [textResponse, setTextResponse] = useState(existing?.textResponse ?? "");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (activity.type === "tarea") {
      if (!textResponse.trim()) {
        setError("Escribe tu respuesta antes de entregar.");
        return;
      }
      saveSubmission({ activityId: activity.id, answers: [], textResponse });
    } else {
      const unanswered = activity.questions.filter((q) => !answers[q.id]?.trim());
      if (unanswered.length > 0) {
        setError("Responde todas las preguntas antes de entregar.");
        return;
      }
      const payload: Answer[] = activity.questions.map((q) => ({
        questionId: q.id,
        value: answers[q.id],
      }));
      saveSubmission({
        activityId: activity.id,
        answers: payload,
        textResponse: "",
      });
    }
    onClose();
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <Modal title={activity.title} onClose={onClose}>
      {activity.description && (
        <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          {activity.description}
        </p>
      )}

      {graded && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-semibold text-emerald-800">
            Calificación: {existing!.grade}/100
          </p>
          {existing!.feedback && (
            <p className="mt-1 text-sm text-emerald-700">
              {existing!.feedback}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        {activity.type === "tarea" ? (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Tu respuesta
            </label>
            <textarea
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
              rows={8}
              disabled={graded}
              className={`${inputClass} disabled:bg-slate-50 disabled:text-slate-500`}
              placeholder="Escribe aquí tu respuesta..."
            />
          </div>
        ) : (
          activity.questions.map((q, i) => (
            <fieldset key={q.id} disabled={graded} className="disabled:opacity-70">
              <legend className="text-sm font-medium text-slate-800">
                {i + 1}. {q.text}{" "}
                <span className="text-xs font-normal text-slate-400">
                  ({q.points} pts)
                </span>
              </legend>

              {q.type === "abierta" && (
                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) =>
                    setAnswers((p) => ({ ...p, [q.id]: e.target.value }))
                  }
                  rows={3}
                  className={inputClass}
                  placeholder="Tu respuesta"
                />
              )}

              {q.type === "booleana" && (
                <div className="mt-2 flex gap-2">
                  {["Verdadero", "Falso"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors ${
                        answers[q.id] === opt
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-slate-300 text-slate-600 hover:border-brand-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() =>
                          setAnswers((p) => ({ ...p, [q.id]: opt }))
                        }
                        className="sr-only"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {q.type === "opcion" && (
                <div className="mt-2 space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        answers[q.id] === opt
                          ? "border-brand-500 bg-brand-50 text-brand-800"
                          : "border-slate-300 text-slate-700 hover:border-brand-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() =>
                          setAnswers((p) => ({ ...p, [q.id]: opt }))
                        }
                        className="h-4 w-4 accent-brand-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          ))
        )}

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {graded ? "Cerrar" : "Cancelar"}
          </button>
          {!graded && (
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {existing ? "Actualizar entrega" : "Entregar"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
