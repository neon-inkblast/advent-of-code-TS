export function timeExec(f: Function, text?: string) {
  const prefix = text ?? ` --> `;
  const start = performance.now();
  const result = f();
  const end = performance.now();
  return `${result} ${prefix} ${Math.round(end - start)}ms`;
}
