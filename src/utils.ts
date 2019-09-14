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
