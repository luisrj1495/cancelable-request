export class AbortError extends Error {
  name = "AbortError";
  canceled = true;
  constructor(message?: string) {
    super(message);
  }
}
