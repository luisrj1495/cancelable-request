export class CancelableError extends Error {
  name = "CancelableError";
  __CANCEL__ = true;
  constructor(message?: string) {
    super(message);
  }
}
