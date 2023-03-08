/**
 * This function check if two object
 * contain the same set of properties
 */

export function checkProperties(A: unknown, B: unknown) {
  return JSON.stringify(A) == JSON.stringify(B);
}
