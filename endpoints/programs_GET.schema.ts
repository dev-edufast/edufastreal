import { z } from "zod";
import superjson from 'superjson';
import type { Selectable } from 'kysely';
import type { Programs } from '../helpers/schema';

// Note: do not define zod schema for output type - just define the type directly
// If the type comes from database, use Selectable<TableName> from kysely directly or with some type transformations to ensure a single source of truth
export type OutputType = Selectable<Programs>[];

export const getPrograms = async (init?: RequestInit): Promise<OutputType> => {
  const result = await fetch(`/_api/programs`, {
    method: "GET",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!result.ok) {
    const errorObject = superjson.parse(await result.text());
        throw new Error(typeof errorObject === 'object' && errorObject !== null && 'error' in errorObject ? String(errorObject.error) : 'Unknown error');
  }
  return superjson.parse<OutputType>(await result.text());
};