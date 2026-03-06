import { z } from "zod";

const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.enum(["programs", "universities", "courses", "all"]).default("all"),
  limit: z.coerce.number().default(10),
});

export async function handle(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    
    const result = searchQuerySchema.safeParse(params);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: "Invalid search parameters", details: result.error.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { q, type, limit } = result.data;

    // Mock search results - in production this would query a database
    const mockResults = {
      programs: [],
      universities: [],
      courses: [],
      total: 0,
      query: q,
    };

    return new Response(
      JSON.stringify(mockResults),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export default { handle };
