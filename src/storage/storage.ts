export default class _Storage<T> {
  storage: Storage;
  key: string;
  default: T;

  constructor({
    storage,
    key,
    defaultValue,
  }: {
    storage: Storage;
    key: string;
    defaultValue: T;
  }) {
    this.storage = storage;
    this.key = key;
    this.default = defaultValue;
  }

  setItem(value: T) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  getItem(): T {
    const item = this.storage.getItem(this.key);
    return item ? JSON.parse(item) : this.default;
  }
}
