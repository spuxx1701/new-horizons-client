import { v4 as uuidv4 } from 'uuid';

/**
 * Returns a promise that resolves after the given number of miliseconds.
 * @param ms The number of miliseconds.
 * @returns The promise.
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a UUID (v4).
 * @returns The UUID.
 */
export function getUuid() {
  return uuidv4();
}
