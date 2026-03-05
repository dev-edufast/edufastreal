import { db } from "../helpers/db";
import { OutputType } from "./testimonials_GET.schema";
import superjson from 'superjson';

export async function handle(request: Request) {
  try {
    const testimonials = await db
      .selectFrom('testimonials')
      .selectAll()
      .where('isFeatured', '=', true)
      .orderBy('createdAt', 'desc')
      .execute();

    return new Response(superjson.stringify(testimonials satisfies OutputType), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: `Failed to fetch testimonials: ${errorMessage}` }), { status: 500 });
  }
}