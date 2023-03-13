/**
 * The Core interfaces,
 * common around the classes
 */

export interface IGetOne<T, K> {
  getOne(x: K): Promise<T | unknown>;
}

export interface IGetAll<T> {
  getAll(): Promise<T[]>;
}

export interface ICreateItem<T, K> {
  createItem(x: K): Promise<T>;
}

export interface IDeleteOne<K> {
  deleteItem(x: K): Promise<void>;
}

export interface ICreateMany<K> {
  createItems(x: K[]): Promise<void>;
}

export interface IAddItem<T> {
  addItem(x: T): Promise<T>;
}

export interface IUpdate<T, K> {
  updateItem(x: T, k: K): Promise<T>;
}
