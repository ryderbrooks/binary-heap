import { Heap }                         from './BaseHeap';
import { IHeap, IHeapable, IIndexable } from '../meta/interfaces';



export abstract class DynamicHeap<T extends object> extends Heap<T & IHeapable & IIndexable>
  implements IHeap<T & IHeapable> {
  public insert( value: T ): T & IHeapable & IIndexable{
    const proxied = this.proxify(value);
    return super.insert(proxied);
  }


  protected swap( a: number, b: number ): void {
    const A = this.heap[ a ];
    const B = this.heap[ b ];
    switch ( true ) {
      //@ts-ignore
      case A === undefined:
      //@ts-ignore
      case B === undefined:
        throw new Error('swap indexes out of range');
      case A === B:
        throw new Error('duplicate heap objects');
      default:
        A.index = b;
        B.index = a;
    }
  }


  protected indexOf( item: T & IHeapable&IIndexable ): number {
    return item.index;
  }


  public constructor( watchProperty: string = 'priority', NUM_CHILDREN?: number ) {
    super(NUM_CHILDREN);
    this.watchProp = watchProperty;
  }


  private watchProp: string;


  protected proxify( item: T ): T & IHeapable&IIndexable {
    let priority = 0;
    let index    = this.heap.length;

    //@ts-ignore
    const proxied: T & IHeapable &IIndexable= new Proxy(item,
                                             {
                                               get : ( target: T,
                                                       p: string,
                                                       receiver?: any ): any => {
                                                 switch ( p ) {
                                                   case 'index':
                                                     return index;
                                                   default:
                                                     return Reflect.get(target,
                                                                        p,
                                                                        receiver);
                                                 }
                                               },
                                               set : ( target: T,
                                                       p: string | number | symbol,
                                                       value: any,
                                                       receiver: any ): boolean => {
                                                 switch ( true ) {
                                                   case p === 'index' && value !== index:
                                                     index              = value as number;
                                                     this.heap[ index ] = proxied;
                                                     return true;
                                                   case p !== this.watchProp:
                                                     return Reflect.set(target,
                                                                        p,
                                                                        value,
                                                                        receiver);
                                                   case value === priority:
                                                     return true;

                                                   default:
                                                     Reflect.set(target,
                                                                 p,
                                                                 value,
                                                                 receiver);

                                                     priority = value;
                                                     index = 0;
                                                     this.heap.splice(index, 1);
                                                     this.heap.unshift(proxied);
                                                     this.sinkDown(0);
                                                     return true;
                                                 }
                                               },
                                             },
    );
    return proxied;
  }
}

