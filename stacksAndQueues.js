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
    this.arr = arr || [-3, -2, -1, 0, 1, 2, 3];
    this.bounds = this.calcBounds() || [[0, 1], [2, 4], [5, 6]];
  }
  calcBounds() {
    if (!this.arr) {
      return null;
    }
    let arr = this.arr;
    const out = [];
    const bound1 = Math.floor((arr.length - 1) / 3);
    const bound2 = Math.floor(((arr.length - 1) / 3) * 2);
    out.push([0, bound1]);
    out.push([bound1 + 1, bound2]);
    out.push([bound2 + 1, arr.length - 1]);
    this.bounds = out;
  }
  getStartIndex(stackNum) {
    return this.bounds[stackNum][0];
  }
  getEndIndex(stackNum) {
    return this.bounds[stackNum][1];
  }
  pop(stackNum) {
    const out = this.peek(stackNum);
    if (!out) {
      return null;
    }
    const startIndex = getStartIndex(stackNum);
    const nextIndex = startIndex + 1;
    if (nextIndex > getEndIndex(stackNum)) {
      // if we have an overflow
      // delete this stack
    }
    for (let i = stackNum; i < this.bounds.length; i++) {
      let bounds = this.bounds[i];
      if (!(i === stackNum)) {
        bounds[0]--;
        // increment index 0
      }
      bounds[1]--;
      // increment index 1
    }

    this.arr.splice(startIndex, 1);
    // delete element and resize array (splice)
    return out;
  }
  push(value, stackNum) {
    let startIndex = getStartIndex(stackNum);
    // iterate forward in bounds, not including stackNum[0], increment all values
    for (let i = stackNum; i < this.bounds.length; i++) {
      let bounds = this.bounds[i];
      if (!(i === stackNum)) {
        bounds[0]++;
        // increment index 0
      }
      bounds[1]++;
      // increment index 1
    }

    this.arr.splice(startIndex, 0, value);
  }
  peek(stackNum) {
    return this.arr[this.getStartIndex(stackNum)];
  }
}

/*
Question 3.2

How would you design a stack which, in addition to push and pop, also has a function
min which returns the minimum element? Push, pop and min should all operate in
O(1) time.

TODO: Finish me

*/
class StackWithMin extends Stack {
  push(node) {
    super.push(node);
    if (!this.mins) {
      this.mins = [this.top];
    }
    if (this.mins[this.mins.length-1].value >= this.top.value) {
      this.mins.push(this.top);
    }
  }
  pop() {
    const out = super.pop();
    if (out == this.min())
  }
  min() {
    return this.min;
  }
}
