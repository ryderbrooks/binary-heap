import { createMaxHeap } from '../index.js';


describe('#MaxHeap', () => {

  it('orders heap so root node is the max on insert', () => {
    const heap = createMaxHeap<number>();
    const v0   = 1;
    const v1   = 2;
    const v2   = 3;
    const v3   = 4;
    heap.insert(v0);
    heap.insert(v2);
    heap.insert(v3);
    heap.insert(v1);
    expect(heap.root).toStrictEqual(v3);
  });



  it('orders heap so root node is the max after extracted root', () => {
    const heap = createMaxHeap<number>();
    const v0   = 1;
    const v1   = 2;
    const v2   = 3;
    const v3   = 4;
    heap.insert(v0);
    heap.insert(v2);
    heap.insert(v3);
    heap.insert(v1);
    heap.extractRoot();
    expect(heap.root).toStrictEqual(v2);
  });
});