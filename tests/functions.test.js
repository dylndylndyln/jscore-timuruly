import { describe, it, expect, vi } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';

describe('Part 1: Utility Functions', () => {
  describe('unique', () => {
    it('should remove duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('edge case: empty array', () => {
      expect(unique([])).toEqual([]);
    });

    it('edge case: invalid type throwing error', () => {
      expect(() => unique(null)).toThrow(TypeError);
    });
  });

  describe('groupBy', () => {
    it('should group objects by computed key', () => {
      const data = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' }
      ];
      const result = groupBy(data, (item) => item.role);
      expect(result.admin).toHaveLength(2);
      expect(result.user).toHaveLength(1);
    });

    it('edge case: empty array', () => {
      expect(groupBy([], (x) => x)).toEqual({});
    });
  });

  describe('chunk', () => {
    it('should split array into chunks of specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('edge case: size 0 or negative size', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([]);
      expect(chunk([1, 2, 3], -1)).toEqual([]);
    });
  });

  describe('deepClone', () => {
    it('should deeply clone nested objects and arrays without changing original', () => {
      const original = { a: 1, b: { c: 2 }, d: [3, 4] };
      const copy = deepClone(original);

      copy.b.c = 99;
      copy.d.push(5);

      expect(original.b.c).toBe(2);
      expect(original.d).toEqual([3, 4]);
      expect(copy.b.c).toBe(99);
    });

    it('edge case: primitive values and null', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone(null)).toBeNull();
    });
  });

  describe('memoize', () => {
    it('should cache execution results', () => {
      const mockFn = vi.fn((x) => x * 2);
      const memoized = memoize(mockFn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('counter', () => {
    it('should manage internal state correctly', () => {
      const cnt = counter(10);
      expect(cnt.value).toBe(10);
      expect(cnt.inc(5)).toBe(15);
      expect(cnt.dec(2)).toBe(13);
      expect(cnt.value).toBe(13);
    });

    it('edge case: zero initial value', () => {
      const cnt = counter(0);
      expect(cnt.value).toBe(0);
      expect(cnt.inc()).toBe(1);
    });
  });
});