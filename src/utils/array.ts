export function sum<T>(arr: T[]): number {
  return arr.map((x) => +x).reduce((a, b) => a + b);
}

export function multi<T>(arr: T[]): number {
  return arr.map((x) => +x).reduce((a, b) => a * b);
}

export function max<T>(arr: T[]): number {
  return sortDesc(arr.slice())[0];
}

export function min<T>(arr: T[]): number {
  return sortAsc(arr.slice())[0];
}

export function sortAsc(arr: any[]): any {
  return arr.sort((a, b) => a - b);
}

export function sortDesc(arr: any[]): any[] {
  return arr.sort((a, b) => b - a);
}

export function splitOnEmpty(arr: string[]): string[][] {
  return splitOnX(arr, "");
}

export function splitOnX<T>(arr: T[], token: T): T[][] {
  const newArr: T[][] = [];
  let tempArr: T[] = [];
  arr.forEach((x) => {
    if (x === token) {
      newArr.push(tempArr);
      tempArr = [];
    } else {
      tempArr.push(x);
    }
  });
  if (tempArr.length > 0) {
    newArr.push(tempArr);
  }
  return newArr;
}

export function splitEvery<T>(arr: T[], n: number): T[][] {
  const newArr: T[][] = [];
  let tempArr: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % n === 0 && tempArr.length > 0) {
      newArr.push(tempArr);
      tempArr = [];
    }
    tempArr.push(arr[i]);
  }

  if (tempArr.length > 0) {
    newArr.push(tempArr);
  }
  return newArr;
}

export function createArrayOf<T>(size: number, fill: () => T | T): T[] {
  return new Array(size)
    .fill(0)
    .map((_) => (typeof fill === "function" ? fill() : fill));
}

export function create2dArrayOf<T>(
  rows: number,
  columns: number,
  fill: () => T
): T[][] {
  return createArrayOf<any>(rows, () => createArrayOf<T>(columns, fill));
}
