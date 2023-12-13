export function memoize<T>(f: Function, log = false) {
  const cache = new Map<string, T>();
  return function (...args: any[]): T {
    const key = JSON.stringify(args);
    if (cache.get(key) != null) {
      if (log) {
        console.log("cache hit for", key);
      }
      return cache.get(key) as T;
    }
    if (log) {
      console.log("cache miss for", key);
    }
    const result: T = f(...args);
    cache.set(key, result);
    return result;
  };
}
