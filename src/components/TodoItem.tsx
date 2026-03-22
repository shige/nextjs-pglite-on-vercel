"use client";

import { useTransition } from "react";
import { usePGlite } from "@electric-sql/pglite-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const db = usePGlite();
  const [isPending, startTransition] = useTransition();

  function toggleTodo() {
    startTransition(async () => {
      await db.query("UPDATE todos SET completed = NOT completed WHERE id = $1", [
        todo.id,
      ]);
    });
  }

  function deleteTodo() {
    startTransition(async () => {
      await db.query("DELETE FROM todos WHERE id = $1", [todo.id]);
    });
  }

  return (
    <li className="flex items-center gap-3 rounded-3xl border border-stone-800 bg-stone-950/60 p-4">
      <button
        aria-label={
          todo.completed ? "Mark todo as incomplete" : "Mark todo as complete"
        }
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
          todo.completed
            ? "border-emerald-300 bg-emerald-300 text-stone-950"
            : "border-stone-600 text-transparent hover:border-amber-300"
        }`}
        disabled={isPending}
        onClick={toggleTodo}
        type="button"
      >
        ✓
      </button>

      <span
        className={`min-w-0 flex-1 text-base ${
          todo.completed ? "text-stone-500 line-through" : "text-stone-100"
        }`}
      >
        {todo.text}
      </span>

      <button
        className="rounded-full border border-stone-700 px-3 py-1 text-sm text-stone-300 transition hover:border-red-400 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        onClick={deleteTodo}
        type="button"
      >
        Delete
      </button>
    </li>
  );
}
