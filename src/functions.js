export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Argument must be an array');
  }
  return arr.reduce((acc, current) => {
    return acc.includes(current) ? acc : [...acc, current];
  }, []);
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr) || typeof keyFn !== 'function') {
    throw new TypeError('Invalid arguments');
  }
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    const existingGroup = acc[key] ?? [];
    return {
      ...acc,
      [key]: [...existingGroup, item]
    };
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array');
  }
  if (typeof size !== 'number' || size <= 0) {
    return [];
  }
  
  return arr.reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / size);
    const currentChunk = acc[chunkIndex] ?? [];
    
    return [
      ...acc.slice(0, chunkIndex),
      [...currentChunk, item]
    ];
  }, []);
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: deepClone(value)
    };
  }, {});
}

export function memoize(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Argument must be a function');
  }
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function counter(initialValue = 0) {
  let count = typeof initialValue === 'number' ? initialValue : 0;

  return {
    inc(step = 1) {
      count += step;
      return count;
    },
    dec(step = 1) {
      count -= step;
      return count;
    },
    get value() {
      return count;
    }
  };
}