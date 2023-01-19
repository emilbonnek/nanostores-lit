/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructable<T = object> = new (...args: any[]) => T;
