import { db } from "../helpers/db";
import { OutputType } from "./programs_GET.schema";
import superjson from 'superjson';

export async function handle(request: Request) {
  try {
    const programs = await db.selectFrom('programs').selectAll().orderBy('title', 'asc').execute();

    return new Response(superjson.stringify(programs satisfies OutputType), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failed to fetch programs:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: `Failed to fetch programs: ${errorMessage}` }), { status: 500 });
  }
}