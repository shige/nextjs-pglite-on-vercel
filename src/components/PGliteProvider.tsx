"use client";

import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import type { PGliteWithLive } from "@electric-sql/pglite/live";
import { PGliteProvider as BasePGliteProvider } from "@electric-sql/pglite-react";
import { useEffect, useState } from "react";
import { SCHEMA } from "@/lib/schema";

type Props = {
  children: React.ReactNode;
};

export function PGliteProvider({ children }: Props) {
  const [db, setDb] = useState<PGliteWithLive | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const nextDb = await PGlite.create({
          dataDir: "idb://todos-db",
          extensions: { live },
        });

        await nextDb.exec(SCHEMA);

        if (!cancelled) {
          setDb(nextDb);
        }
      } catch (initError) {
        if (!cancelled) {
          setError(
            initError instanceof Error
              ? initError.message
              : "Failed to initialize PGlite.",
          );
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/40 bg-red-950/30 p-6 text-sm text-red-100">
        <p className="font-semibold">Database initialization failed.</p>
        <p className="mt-2 text-red-100/80">{error}</p>
      </div>
    );
  }

  if (!db) {
    return (
      <div className="rounded-3xl border border-stone-800 bg-stone-900/70 p-6 text-sm text-stone-300">
        Loading browser database...
      </div>
    );
  }

  return <BasePGliteProvider db={db}>{children}</BasePGliteProvider>;
}
