"use client";

import { useLiveQuery } from "@electric-sql/pglite-react";
import { TodoItem } from "@/components/TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
};

export function TodoList() {
  const todoQuery = useLiveQuery<Todo>(
    "SELECT id, text, completed, created_at FROM todos ORDER BY created_at DESC, id DESC",
  );
  const todos = todoQuery?.rows ?? [];

  if (todos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-stone-700 p-8 text-center text-stone-400">
        No todos yet. Add one to verify live queries and IndexedDB
        persistence.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
