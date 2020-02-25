import { Heap }      from './BaseHeap.js';
import { IHeapable } from '..';



export class MinHeap<T extends IHeapable> extends Heap<T> {
  protected comparator( parentIndex: number, elementIndex: number ): boolean {
    return this.heap[ parentIndex ] < this.heap[ elementIndex ];
  }
}