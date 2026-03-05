import { schema, OutputType } from "./eligibility_POST.schema";
import { db } from "../helpers/db";
import superjson from 'superjson';
import { ZodError } from "zod";
import { syncToGoogleSheets } from "../helpers/googleSheetsSync";

export async function handle(request: Request) {
  try {
    if (request.method !== 'POST') {
      return new Response(superjson.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const json = superjson.parse(await request.text());
    const validatedData = schema.parse(json);

    const submission = await db
      .insertInto('eligibilitySubmissions')
      .values({
        name: validatedData.name,
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email,
        course: validatedData.course,
        branch: validatedData.branch,
        previousUniversity: validatedData.previousUniversity,
        papersPassed: validatedData.papersPassed,
        comments: validatedData.comments,
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    // Sync to Google Sheets
    console.log('Attempting to sync eligibility submission to Google Sheets');
    try {
      await syncToGoogleSheets("Eligibility Check", {
        name: validatedData.name,
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email,
        course: validatedData.course,
        branch: validatedData.branch,
        previousUniversity: validatedData.previousUniversity,
        papersPassed: validatedData.papersPassed.toString(),
        comments: validatedData.comments || '',
        status: 'Pending Review',
        source: 'Eligibility Check Form',
      });
    } catch (syncError) {
      console.error('Failed to sync eligibility submission to Google Sheets:', syncError);
      // Continue execution - don't fail the user request due to sync issues
    }

    // Sync to "Leads" tab with standardized columns
    try {
      await syncToGoogleSheets("Leads", {
        fullName: validatedData.name,
        email: validatedData.email,
        whatsapp: validatedData.phoneNumber,
        interestedProgram: `${validatedData.course} - ${validatedData.branch}`,
        message: validatedData.comments || '',
        status: 'Pending Review',
        source: 'Eligibility Check Form',
      });
    } catch (syncError) {
      console.error('Failed to sync to Leads tab:', syncError);
      // Continue execution - don't fail the user request due to sync issues
    }

    return new Response(superjson.stringify({
      success: true,
      message: 'Eligibility submission received successfully.',
      submissionId: submission.id,
    } satisfies OutputType), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in eligibility submission endpoint:", error);

    if (error instanceof ZodError) {
      return new Response(superjson.stringify({ error: 'Invalid input data.', details: error.errors }), { status: 400 });
    }

    if (error instanceof Error) {
        // Check for unique constraint violation on email
        if ('code' in error && error.code === '23505' && error.message.includes('eligibility_submissions_email_key')) {
            return new Response(superjson.stringify({ error: 'An application with this email address has already been submitted.' }), { status: 409 });
        }
        return new Response(superjson.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(superjson.stringify({ error: 'An unknown error occurred.' }), { status: 500 });
  }
}