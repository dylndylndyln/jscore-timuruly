import { describe, it, expect } from 'vitest';
import { Store, SortedStore } from '../src/Store.js';

describe('Part 2: Store & SortedStore Classes', () => {
  it('should add items and compute total price', () => {
    const store = new Store();
    store.add({ title: 'Book', price: 15 });
    store.add({ title: 'Pen', price: 5 });

    expect(store.count).toBe(2);
    expect(store.total()).toBe(20);
  });

  it('should remove item by id', () => {
    const store = new Store();
    const item = store.add({ title: 'Phone', price: 500 });
    
    expect(store.remove(item.id)).toBe(true);
    expect(store.count).toBe(0);
  });

  it('edge case: find non-existing item returns null', () => {
    const store = new Store();
    expect(store.find((item) => item.id === 'unknown')).toBeNull();
  });

  it('should inherit from Store and override total method in SortedStore', () => {
    const sortedStore = new SortedStore([
      { title: 'A', price: 10.555 },
      { title: 'B', price: 20.444 }
    ]);

    expect(sortedStore.total()).toBe(31) /* 31.00 после toFixed(2) */;
    expect(sortedStore.getSortedItems()[0].title).toBe('A');
  });

  it('static method generateId returns a string', () => {
    const id = Store.generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});