export function clamp(number: number, min: number = 0, max: number = 1): number {
  return Math.max(min, Math.min(max, number));
}

export function mod(dividend: number, divisor: number) {
  return dividend - divisor * Math.floor(dividend / divisor);
}

export function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

export function leastCommonMultiple(nums: number[]) {
  const multiple = nums.reduce((acc, n) => {
    return lcm(acc, n);
  }, 1);

  return multiple;
}
