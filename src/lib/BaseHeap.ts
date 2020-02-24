import { IHeap, IHeapable } from '../meta/interfaces';



export abstract class Heap<T extends IHeapable> implements IHeap<T> {
  public constructor( NUM_CHILDREN: number = 2 ) {
    this.NUM_CHILDREN = NUM_CHILDREN;
  }


  public get root(): T {
    return this.heap[ 0 ];
  }


  public get size(): number {
    return this.heap.length;
  }


  public heap: T[] = [];


  public remove( item: T ): void {
    const index = this.indexOf(item);
    switch ( true ) {
      case index === undefined:
        throw new Error('item not found in heap');
      case this.heap.length === 0:
        throw new Error('heap is empty');
      case index === this.heap.length - 1:
      case this.heap.length === 1 && index! === 0:
        this.heap.pop();
        break;
      case index === 0:
        this.extractRoot();
        break;
      default:
        this.heap[ index! ] = this.heap.pop()!;
        this.sinkDown(index!);
    }
  }


  public extractRoot(): T {
    if( !this.heap.length ) {
      throw new Error('heap is empty');
    }
    const root = this.heap[ 0 ];
    if( this.heap.length > 1 ) {
      this.heap[ 0 ] = this.heap.pop()!;
      this.sinkDown(0);
      return root;
    }
    this.heap.shift();
    return root;
  }


  public insert( value: T ): T {
    this.heap.push(value);
    this.bubbleUp();
    return value;
  }


  private NUM_CHILDREN: number;


  private leftChild( index: number ): number {
    return index * this.NUM_CHILDREN + 1;
  }


  private rightChild( index: number ): number {
    return index * this.NUM_CHILDREN + 2;
  }


  private parent( index: number ): number {
    return Math.floor((index - 1) / this.NUM_CHILDREN);
  }


  private bubbleUp( index: number = this.heap.length - 1 ): void {
    while ( index > 0 ) {
      const parentIndex = this.parent(index);
      switch ( true ) {
        case parentIndex >= this.heap.length:
        case this.heap[ parentIndex ] === this.heap[ index ]:
        case this._comparator(parentIndex, index):
          return;
        default:
          this.swap(parentIndex, index);
          index = parentIndex;
      }
    }
  }


  private _comparator( parentIndex: number, elementIndex: number ): boolean {
    switch ( true ) {
      case parentIndex === elementIndex:
        throw new Error('parent index equals element index');
      case parentIndex < 0:
        throw new Error('parent index is less than zero');
      case parentIndex >= this.heap.length:
        throw new Error('parent index is greater than heap length');
      case elementIndex < 0:
        throw new Error('element index is less than zero');
      case elementIndex >= this.heap.length:
        throw new Error('element index is greater than heap length');
      case this.heap[ parentIndex ] === undefined:
        throw new Error('parent is undefined');
      case this.heap[ elementIndex ] === undefined:
        throw new Error('element is undefined');
    }
    return this.comparator(parentIndex, elementIndex);
  }


  protected sinkDown( index: number ): void {
    // const rightChildIndex = this.rightChild(index);
    // const leftChildIndex = this.leftChild(index);
    let largest = this.check(this.rightChild(index),
                             this.check(this.leftChild(index), index));
    if( largest !== index ) {
      this.swap(largest, index);
      this.sinkDown(largest);
    }
  }


  protected check( index: number, largest: number ): number {
    if( index < this.heap.length ) {
      if( this._comparator(index, largest) ) {
        return index;
      }
    }
    return largest;
  }


  protected swap( a: number, b: number ): void {
    const A        = this.heap[ a ];
    const B        = this.heap[ b ];
    this.heap[ a ] = B;
    this.heap[ b ] = A;
  }


  protected abstract comparator( parentIndex: number, elementIndex: number ): boolean;


  protected swapRoot(): void {
    this.heap[ 0 ] = this.heap.pop()!;
  }


  protected indexOf( item: T ): number {
    return this.heap.indexOf(item);
  }
}


