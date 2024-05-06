export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function parseArray(string: string, separator = ';'): string[] {
  return string.split(separator);
}

export function parseBoolean(string: string): boolean {
  return string === 'true';
}

export function parseNumber(string: string, numAfterDigit = 0): number {
  const RADIX = 10;
  const factor = Math.pow(RADIX, numAfterDigit);

  return Math.trunc(parseFloat(string) * factor) / factor;
}
