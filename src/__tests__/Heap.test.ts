import { Heap } from '../lib/BaseHeap.js';


describe('#Heap', () => {

  class TestMaxHeap extends Heap<number> {
    protected comparator( parentIndex: number, elementIndex: number ): boolean {
      return this.heap[ parentIndex ] > this.heap[ elementIndex ];
    }


    public get _heap(): number[] {
      return this.heap;
    }
  }



  it('inserts into empty heap', () => {
    const heap = new TestMaxHeap();
    const n0   = 1;
    heap.insert(n0);
    expect(heap._heap).toHaveLength(1);
    expect(heap._heap[ 0 ]).toStrictEqual(n0);
  });

  it('extracts from single node heap', () => {
    const heap = new TestMaxHeap();
    const n0   = 1;
    heap.insert(n0);
    expect(heap.extractRoot()).toStrictEqual(n0);
    expect(heap._heap).toHaveLength(0);
  });


  it('maintains order while inserting multiple nodes', () => {
    const heap = new TestMaxHeap();

    const r1   = 1;
    const r2   = 2;
    const r3   = 3;
    const r4   = 4;
    const root = 5;
    const z    = [ r1, r4, r2, root, r3 ];

    z.forEach(d => heap.insert(d));

    expect(heap._heap).toHaveLength(5);
    expect(heap.root).toStrictEqual(root);
  });

  it('throws when extracting from empty heap', () => {
    const heap = new TestMaxHeap();
    expect(() => heap.extractRoot()).toThrow('heap is empty');
  });

  it('maintains correct heap order when extracting', () => {
    const heap = new TestMaxHeap();


    const r1   = 1;
    const r2   = 2;
    const r3   = 3;
    const r4   = 4;
    const root = 5;
    const z    = [ r3, r1, r4, root, r2 ];
    z.forEach(d => heap.insert(d));
    heap.extractRoot();
    expect(heap._heap).toHaveLength(4);
    expect(heap.root).toStrictEqual(r4);
  });

  it('removes element from heap while maintaining ordering', () => {
    const heap = new TestMaxHeap();
    const r1   = 1;
    const r2   = 2;
    const r3   = 3;
    const r4   = 4;
    const root = 5;
    const z    = [ r3, r1, r4, root, r2 ];
    z.forEach(d => heap.insert(d));
    heap.remove(r3);

    expect(heap._heap).toHaveLength(4);
    expect(heap.extractRoot()).toStrictEqual(root);
    expect(heap.extractRoot()).toStrictEqual(r4);
    expect(heap.extractRoot()).toStrictEqual(r2);
    expect(heap.extractRoot()).toStrictEqual(r1);
  });
});