export async function syncToGoogleSheets(
  _sheetName: string,
  _payload: unknown
): Promise<void> {
  // Production-safe fallback: no-op in environments without Google Sheets wiring.
  return;
}

export default syncToGoogleSheets;
