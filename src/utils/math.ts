export function clamp(
  number: number,
  min: number = 0,
  max: number = 1,
): number {
  return Math.max(min, Math.min(max, number));
}

export function mod(dividend: number, divisor: number) {
  return dividend - divisor * Math.floor(dividend / divisor);
}
