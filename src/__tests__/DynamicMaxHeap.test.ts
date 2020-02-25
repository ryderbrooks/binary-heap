import { createMaxDynamicHeap } from '../index.js';


describe('#DynamicMaxHeap', () => {

  class Node {
    public constructor( val: number = 0 ) {
      this.testProp = val;
    }


    public testProp: number;


    public [ Symbol.toPrimitive ](): number {
      return this.testProp;
    }


    public valueOf(): number {
      return this.testProp;
    }


  }



  it('updates heap on property change', () => {

    const heap = createMaxDynamicHeap<Node>('testProp');


    const v0 = heap.insert(new Node(0));
    //@ts-ignore
    const v1 = heap.insert(new Node(1));
    //@ts-ignore
    const v2 = heap.insert(new Node(2));
    const v3 = heap.insert(new Node(3));

    expect(heap.root).toStrictEqual(v3);

    v0.testProp = 4;

    expect(heap.root).toStrictEqual(v0);

  });
});