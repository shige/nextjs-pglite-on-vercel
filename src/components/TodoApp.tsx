import { PGliteProvider } from "@/components/PGliteProvider";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";

export function TodoApp() {
  return (
    <main className="min-h-screen px-6 py-10 text-stone-50 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex flex-col justify-between rounded-[2rem] border border-stone-800/80 bg-stone-950/75 p-8 shadow-2xl shadow-stone-950/30 backdrop-blur">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
              Local-first Postgres
            </p>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                Todos stored in IndexedDB, queried like Postgres.
              </h1>
              <p className="max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
                PGlite runs entirely in the browser, persists locally, and keeps
                the UI reactive with live queries. Reload the page and your data
                stays here.
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-stone-300">
            <span className="rounded-full border border-stone-700 px-4 py-2">
              Next.js 16
            </span>
            <span className="rounded-full border border-stone-700 px-4 py-2">
              React 19
            </span>
            <span className="rounded-full border border-stone-700 px-4 py-2">
              PGlite + live queries
            </span>
          </div>
        </section>

        <section className="rounded-[2rem] border border-amber-200/10 bg-stone-900/80 p-6 shadow-xl shadow-amber-950/10 backdrop-blur sm:p-8">
          <PGliteProvider>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-stone-400">
                  Browser DB
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Todo list
                </h2>
              </div>
              <TodoForm />
              <TodoList />
            </div>
          </PGliteProvider>
        </section>
      </div>
    </main>
  );
}
