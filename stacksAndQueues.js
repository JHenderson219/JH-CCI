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
Question 3.1

Describe how you could use a single array to implement three stacks
*/

class ArrStacks {
  constructor(arr) {
    this.arr = arr || [-2, -1, 0, 1, 2];
  }
  getStartIndex(stackNum) {
    switch (stackNum) {
      case 1:
        return 0;
      case 2:
        return this.arr.length - 1;
      case 3:
        return Math.floor(this.arr.length / 2);
      default:
        break;
    }
  }
  pop(stackNum) {
    const out = this.peek(stackNum);
    this.arr.splice(this.getStartIndex(stackNum, 1));
    return out;
  }
  push(value, stackNum) {
    this.arr.splice(this.getStartIndex(stackNum), 0, value);
  }
  peek(stackNum) {
    return this.arr[this.getStartIndex(stackNum)];
  }
}
