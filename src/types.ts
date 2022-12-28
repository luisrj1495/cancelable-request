type OmitFirstArgType<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;

export interface CancelableRequestFnType<T extends (...args: any[]) => any> {
  (...args: Parameters<OmitFirstArgType<T>>): ReturnType<T>;
  cancel(): void;
}
