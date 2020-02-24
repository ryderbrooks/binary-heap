export interface IHeapable {
  [Symbol.toPrimitive]?(): number;
  valueOf(): number;
}

export interface IIndexable {
  index: number;
}




export interface IHeap<T extends IHeapable> {
  root: T;
  size: number;
  heap: T[];

  remove( item: T ): void;

  extractRoot(): T;

  insert( item: T ): T;
}