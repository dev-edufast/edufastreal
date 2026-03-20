import { db } from "../helpers/db";
import { OutputType } from "./programs_GET.schema";
import superjson from 'superjson';

export async function handle(request: Request) {
  try {
    const programsRaw = await db.selectFrom('programs').selectAll().orderBy('title', 'asc').execute();
    const programs = programsRaw as OutputType;

    return new Response(superjson.stringify(programs), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: `Failed to fetch programs: ${errorMessage}` }), { status: 500 });
  }
}