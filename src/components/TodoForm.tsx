"use client";

import { FormEvent, useState } from "react";
import { usePGlite } from "@electric-sql/pglite-react";

export function TodoForm() {
  const db = usePGlite();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = text.trim();
    if (!value) {
      return;
    }

    setIsSubmitting(true);

    try {
      await db.query("INSERT INTO todos (text) VALUES ($1)", [value]);
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        aria-label="New todo"
        className="min-w-0 flex-1 rounded-2xl border border-stone-700 bg-stone-950/80 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-amber-300"
        onChange={(event) => setText(event.target.value)}
        placeholder="Draft the next task..."
        value={text}
      />
      <button
        className="rounded-2xl bg-amber-300 px-5 py-3 font-medium text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-amber-300/60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Saving..." : "Add"}
      </button>
    </form>
  );
}
