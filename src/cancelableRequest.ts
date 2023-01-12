import { isCancel } from "./isCancel";
import { CancelableError } from "./error";

// Types
import { CancelableRequestFnType } from "./types";

export const cancelableRequest = <
  T extends (signal: AbortController["signal"], ...args: any[]) => any
>(
  cb: T,
  message?: string
) => {
  let cancelToken: AbortController | null = null;
  const errorMessage = message || "canceled";

  const cancel = () => cancelToken?.abort(errorMessage);

  const cancelable: CancelableRequestFnType<T> = async (...params) => {
    cancel();

    cancelToken = new AbortController();

    try {
      const response = await cb(cancelToken.signal, ...params);

      return response;
    } catch (e) {
      if (isCancel(e))
        throw new CancelableError(cancelToken.signal.reason || errorMessage);

      return Promise.reject(e);
    }
  };

  cancelable.cancel = cancel;

  return cancelable;
};
