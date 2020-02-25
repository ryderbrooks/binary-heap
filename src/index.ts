import { MinHeap }          from './lib/MinHeap.js';
import { IHeap, IHeapable } from './meta/interfaces';
import { DynamicMinHeap }   from './lib/DynamicMinHeap.js';
import { DynamicMaxHeap }   from './lib/DynamicMaxHeap.js';
import { MaxHeap }          from './lib/MaxHeap.js';


export { IHeap } from './meta/interfaces';
export {IHeapable} from './meta/interfaces';
export {IIndexable} from './meta/interfaces';

export { MinHeap }        from './lib/MinHeap.js';
export { MaxHeap }        from './lib/MaxHeap.js';
export { DynamicMinHeap } from './lib/DynamicMinHeap.js';
export { DynamicMaxHeap } from './lib/DynamicMaxHeap.js';

export function createMinHeap<T extends IHeapable>( nChildren?: number ): IHeap<T> {
  return new MinHeap(nChildren);
}


export function createMaxHeap<T extends IHeapable>( nChildren?: number ): IHeap<T> {
  return new MaxHeap(nChildren);
}


export function createMaxDynamicHeap<T extends object & IHeapable>( watchProp: string,
                                                        nChildren?: number ): IHeap<T> {
  return new DynamicMaxHeap(watchProp, nChildren);
}

export function createMinDynamicHeap<T extends object & IHeapable>( watchProp: string,
                                                        nChildren?: number ): IHeap<T> {
  return new DynamicMinHeap(watchProp, nChildren);
}