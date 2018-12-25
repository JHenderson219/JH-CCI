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

// TODO: Fix this. It won't actually solve the problem as described.
// class ArrStacks {
//   constructor(arr) {
//     this.arr = arr || [-2, -1, 0, 1, 2];
//   }
//   getStartIndex(stackNum) {
//     switch (stackNum) {
//       case 1:
//         return 0;
//       case 2:
//         return this.arr.length - 1;
//       case 3:
//         return Math.floor(this.arr.length / 2);
//       default:
//         break;
//     }
//   }
//   pop(stackNum) {
//     const out = this.peek(stackNum);
//     this.arr.splice(this.getStartIndex(stackNum, 1));
//     return out;
//   }
//   push(value, stackNum) {
//     this.arr.splice(this.getStartIndex(stackNum), 0, value);
//   }
//   peek(stackNum) {
//     return this.arr[this.getStartIndex(stackNum)];
//   }
// }

class ArrStacks {
  constructor(arr) {
    this.arr = arr || [-3, -2, -1, 0, 1, 2, 3];
    this.bounds = this.calcBounds(arr) || [[0, 1], [2, 4], [5, 6]];
  }
  calcBounds(arr) {
    if (!arr) {
      return null;
    }
    const out = [];
    const bound1 = Math.floor((arr.length - 1) / 3);
    const bound2 = Math.floor(((arr.length - 1) / 3) * 2);
    out.push([0, bound1]);
    out.push([bound1 + 1, bound2]);
    out.push([bound2 + 1, arr.length - 1]);
    return out;
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
    if (nextIndex > this.bounds[stackNum][1]) {
      // if we have an overflow
    }
    if (stackNum > 1) {
      this.bounds[stackNum][0] = nextIndex;
    }

    this.arr.splice(startIndex, 1);
    // update bounds
    // delete element and resize array (splice)
    return out;
  }
  push(value, stackNum) {

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

*/
class StackWithMin extends Stack {
  push(node) {
    super.push(node);
    if (!this.min) {
      this.min = this.top;
    }
    if (this.min.value > this.top.value) {
      this.min = this.top;
    }
  }
  pop() {
    const out = this.peek();
  }
  min() {
    return this.min;
  }
}
