export const isCancel = (error: any) => {
  if (typeof error === "object")
    return Boolean(error?.__CANCEL__ || error?.canceled);

  return false;
};
