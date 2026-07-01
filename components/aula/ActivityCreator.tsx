"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useAula } from "./AulaProvider";
import type {
  ActivityType,
  Course,
  Question,
  QuestionType,
} from "@/lib/aula/types";

function emptyQuestion(): Question {
  return {
    id: `q-${Math.random().toString(36).slice(2, 8)}`,
    text: "",
    type: "opcion",
    options: ["", ""],
    points: 10,
  };
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "opcion", label: "Opción múltiple" },
  { value: "booleana", label: "Verdadero / Falso" },
  { value: "abierta", label: "Respuesta abierta" },
];

export default function ActivityCreator({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const { addActivity } = useAula();
  const [type, setType] = useState<ActivityType>("formulario");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion()]);
  const [error, setError] = useState("");

  function updateQuestion(id: string, patch: Partial<Question>) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    );
  }

  function setOption(qId: string, index: number, value: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.map((o, i) => (i === index ? value : o)) }
          : q,
      ),
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !dueDate) {
      setError("Agrega un título y una fecha límite.");
      return;
    }

    if (type === "formulario") {
      const cleaned = questions
        .map((q) => ({
          ...q,
          text: q.text.trim(),
          options:
            q.type === "opcion"
              ? q.options.map((o) => o.trim()).filter(Boolean)
              : [],
        }))
        .filter((q) => q.text);

      if (cleaned.length === 0) {
        setError("El formulario necesita al menos una pregunta con texto.");
        return;
      }
      if (cleaned.some((q) => q.type === "opcion" && q.options.length < 2)) {
        setError("Las preguntas de opción múltiple necesitan al menos 2 opciones.");
        return;
      }

      addActivity({
        courseId: course.id,
        type,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        questions: cleaned,
      });
    } else {
      addActivity({
        courseId: course.id,
        type,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        questions: [],
      });
    }

    onClose();
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

  return (
    <Modal
      title={`Nueva actividad · ${course.subject} ${course.group}`}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tipo */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          {(["formulario", "tarea"] as ActivityType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                type === t
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t === "formulario" ? "Formulario" : "Tarea"}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Título
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="Ej. Cuestionario de fracciones"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Instrucciones
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Describe lo que el alumno debe hacer."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Fecha límite
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Constructor de preguntas (solo formulario) */}
        {type === "formulario" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900">
                Preguntas
              </h4>
              <button
                type="button"
                onClick={() =>
                  setQuestions((prev) => [...prev, emptyQuestion()])
                }
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                + Agregar
              </button>
            </div>

            {questions.map((q, qi) => (
              <div
                key={q.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Pregunta {qi + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setQuestions((prev) =>
                          prev.filter((item) => item.id !== q.id),
                        )
                      }
                      className="text-xs font-medium text-rose-600 hover:text-rose-700"
                    >
                      Quitar
                    </button>
                  )}
                </div>

                <input
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                  className={inputClass}
                  placeholder="Escribe la pregunta"
                />

                <div className="mt-3 flex gap-2">
                  <select
                    value={q.type}
                    onChange={(e) =>
                      updateQuestion(q.id, {
                        type: e.target.value as QuestionType,
                        options:
                          e.target.value === "opcion" ? ["", ""] : [],
                      })
                    }
                    className="flex-1 rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-900 outline-none focus:border-brand-500"
                  >
                    {QUESTION_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={q.points}
                      onChange={(e) =>
                        updateQuestion(q.id, {
                          points: Number(e.target.value) || 0,
                        })
                      }
                      className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-sm text-slate-900 outline-none focus:border-brand-500"
                    />
                    <span className="text-xs text-slate-500">pts</span>
                  </div>
                </div>

                {q.type === "opcion" && (
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">
                          {String.fromCharCode(65 + oi)}.
                        </span>
                        <input
                          value={opt}
                          onChange={(e) => setOption(q.id, oi, e.target.value)}
                          className="flex-1 rounded-lg border border-slate-300 px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-brand-500"
                          placeholder={`Opción ${oi + 1}`}
                        />
                        {q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              updateQuestion(q.id, {
                                options: q.options.filter((_, i) => i !== oi),
                              })
                            }
                            aria-label="Quitar opción"
                            className="text-slate-400 hover:text-rose-600"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestion(q.id, { options: [...q.options, ""] })
                      }
                      className="text-xs font-medium text-brand-600 hover:text-brand-700"
                    >
                      + Opción
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
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
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Publicar
          </button>
        </div>
      </form>
    </Modal>
  );
}
