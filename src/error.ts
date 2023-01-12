export class CancelableError extends Error {
  name = "CancelableError";
  canceled = true;
  constructor(message?: string) {
    super(message);
  }
}
