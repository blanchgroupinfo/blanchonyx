export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("[Error Reporting]", error, context);
}
