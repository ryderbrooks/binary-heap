import { createMinHeap } from '../index';


describe('#MinHeap', ()=>{

  it('orders heap so root node is the min on insert', () => {
    const heap = createMinHeap<number>();
    const v0   = 1;
    const v1   = 2;
    const v2   = 3;
    const v3   = 4;
    heap.insert(v0);
    heap.insert(v2);
    heap.insert(v3);
    heap.insert(v1);
    expect(heap.root).toStrictEqual(v0);
  });



  it('orders heap so root node is the min after extracted root', () => {
    const heap = createMinHeap<number>();
    const v0   = 1;
    const v1   = 2;
    const v2   = 3;
    const v3   = 4;
    heap.insert(v1);
    heap.insert(v2);
    heap.insert(v0);
    heap.insert(v3);
    heap.extractRoot();
    expect(heap.root).toStrictEqual(v1);
  });
})