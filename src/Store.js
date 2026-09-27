export class Store {
  #items = [];

  constructor(initialItems = []) {
    if (Array.isArray(initialItems)) {
      this.#items = initialItems.map((item) => ({ ...item }));
    }
  }

  add(item) {
    if (!item || typeof item !== 'object') {
      throw new TypeError('Item must be an object');
    }
    const newItem = { id: Store.generateId(), ...item };
    this.#items = [...this.#items, newItem];
    return newItem;
  }

  remove(id) {
    const initialLength = this.#items.length;
    this.#items = this.#items.filter((item) => item.id !== id);
    return this.#items.length !== initialLength;
  }

  find(predicate) {
    if (typeof predicate !== 'function') {
      return null;
    }
    return this.#items.find(predicate) ?? null;
  }

  total(priceKey = 'price') {
    return this.#items.reduce((sum, item) => {
      const price = typeof item[priceKey] === 'number' ? item[priceKey] : 0;
      return sum + price;
    }, 0);
  }

  get count() {
    return this.#items.length;
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }

  static generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
}

export class SortedStore extends Store {
  #sortKey;

  constructor(initialItems = [], sortKey = 'price') {
    super(initialItems);
    this.#sortKey = sortKey;
  }

  total(priceKey = this.#sortKey) {
    const baseTotal = super.total(priceKey);
    return Number(baseTotal.toFixed(2));
  }

  getSortedItems() {
    return [...this.items].sort((a, b) => {
      const valA = a[this.#sortKey] ?? 0;
      const valB = b[this.#sortKey] ?? 0;
      return valA > valB ? 1 : -1;
    });
  }
}