/*
Stacks & Queues setup
*/
class Node {
  constructor(data, next) {
    this.data = data || null;
    this.next = next || null;
  }
}

class Stack {
  pop() {
    if (!this.top) {
      return null;
    }
    const out = this.top;
    out.next = null;
    this.top = this.top.next;
    return out;
  }
  push(data) {
    const node = new Node(data);
    node.next = this.top;
    this.top = node;
  }
  peek() {
    if (!this.top) {
      return null;
    }
    return this.top;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(node) {
    if (!this.first) {
      this.first = node;
    } else {
      this.last.next = node;
    }
    this.last = node;
  }

  dequeue() {
    if (!this.first) {
      return null;
    }
    const out = this.first;
    this.first = this.first.next;
    return out;
  }
  peek() {
    return this.first;
  }
}


/*

*/
