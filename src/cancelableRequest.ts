// Types
import { CancelableRequestFnType } from "./types";

export const cancelableRequest = <
  T extends (signal: AbortController["signal"], ...args: any[]) => any
>(
  cb: T,
  message?: string
) => {
  let cancelToken: AbortController | null = null;

  const cancel = () => cancelToken?.abort(message || "Request canceled");

  const cancelable: CancelableRequestFnType<T> = (...params) => {
    cancel();

    cancelToken = new AbortController();

    return cb(cancelToken.signal, ...params);
  };

  cancelable.cancel = cancel;

  return cancelable;
};
