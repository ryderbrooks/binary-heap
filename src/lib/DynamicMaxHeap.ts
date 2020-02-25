import { DynamicHeap } from './DynamicHeap.js';



export class DynamicMaxHeap<T extends object> extends DynamicHeap<T> {
  protected comparator( parentIndex: number, elementIndex: number ): boolean {
    return this.heap[ parentIndex ] > this.heap[ elementIndex ];
  }
}