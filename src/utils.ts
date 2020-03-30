/**
 * Return the key-value pairs in the object, but preserve detailed type
 * information about the keys. That is, if the set of keys is statically-known,
 * then the returned entries will preserve that type.
 */
export function entries<T extends string, U>(
  obj: Partial<Record<T, U>>,
): Array<[T, U]> {
  const result: Array<[T, U]> = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      result.push([k as T, v as U]);
    }
  }
  return result;
}

export function upcast<From extends To, To>(t: From): To {
  return t;
}

export async function log(message: string, ...params: any[]): Promise<void> {
  // tslint:disable-next-line: no-console
  console.log(message, ...params);
}

export function assert(condition: boolean, message: string): condition is true {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  return condition;
}

export function unreachable(arg: never, message: string): never {
  throw new Error(`unreachable: ${message}`);
}

/**
 * Determine if two objects are equal.
 *
 * This code is from `vuetify/src/util/helpers.ts` (Vuetify license: MIT), but
 * inlined here because configuring Jest to import from TypeScript files in
 * `node_modules` seems to be difficult.
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    // If the values are Date, they were convert to timestamp with getTime and compare it
    if (a.getTime() !== b.getTime()) {
      return false;
    }
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every(p => deepEqual(a[p], b[p]));
}
