export function router<T extends Record<string, any>>(r: T) {
  return r as T;
}

export const publicProcedure = {
  input(_: any) {
    return this;
  },
  query(cb: (opts: any) => any) {
    return cb as any;
  },
  mutation(cb: (opts: any) => any) {
    return cb as any;
  },
};

export type Router = Record<string, any>;
