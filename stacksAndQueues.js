import { merge } from "rxjs";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

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
    const out = this.top.data;
    this.top = this.top.next;
    return out;
  }
  push(data) {
    const node = new Node(data);
    node.next = this.top || null;
    this.top = node;
  }
  peek() {
    if (!this.top) {
      return null;
    }
    return this.top.data;
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
    const arr = this.arr;
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
      const bounds = this.bounds[i];
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
    const startIndex = getStartIndex(stackNum);
    // iterate forward in bounds, not including stackNum[0], increment all values
    for (let i = stackNum; i < this.bounds.length; i++) {
      const bounds = this.bounds[i];
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

*/
class StackWithMin extends Stack {
  push(node) {
    super.push(node);
    if (!this.min) {
      this.min = node;
    }
    if (node.value < this.min.value) {
      node.min = this.min;
      this.min = node;
    }
    // insert value
    // this.min.min.min ... from the largest value should eventually null terminate, and that object is the min for the stack
  }
  pop() {
    const out = super.pop();
    this.min = out.min;
    return out;
  }
  min() {
    return this.min;
  }
}


// 9,8,7,6
// 1,7,4,9
// 7,3,7,5,9
// 3,9,5,7,4

/*
Problem 3.3

Imagine a (literal) stack of plates. If the stack gets too high, it might topple.

Therefore, in real life, we would likely start a new stack when the previous stack exceeds
some threshold.

Implement a data structure SetOfStacks that mimics this.

SetOfStacks should be composed of several stacks, and should create a new stack once
the previous one exceeds capacity.

SetOfStacks push() and SetOfStacks pop() should behave identically to a single stack
(that is, pop() should return the same values as it would if there were just a single stack)

FOLLOW UP
Implement a function popAt(int index) which performs a pop operation on a specifc
sub-stack

*/

class SetOfStacks {
  constructor(maxStackLength) {
    this.maxStackLength = maxStackLength || 2;
    this.stacks = [];
  }
  push(node) {
    let stack = this._peekStack();
    if (stack.length > this.maxStackLength) {
      stack = new Stack();
      this._pushStack(stack);
    }
    stack.push(node);
  }
  pop() {
    const selectedStack = this._peekStack();
    const node = selectedStack.pop();
    if (!selectedStack.peek()) {
      // if last stack is empty
      this.stacks = this.stacks.slice(this.stacks.length - 1);
      // slice it off
    }
    return node;
  }
  popAt(index) {
    return this.stacks[index].pop();
  }
  peek() {
    return this._peekStack().peek();
  }
  _pushStack(stack) {
    this.stacks.push(stack);
  }
  _peekStack() {
    return this.stacks[this.stacks.length - 1];
  }
}


/*
Problem 3.4

In the classic problem of the Towers of Hanoi, you have 3 rods and N disks of diﬀerent
sizes which can slide onto any tower The puzzle starts with disks sorted in ascending
order of size from top to bottom (e g , each disk sits on top of an even larger one) You
have the following constraints:

(A) Only one disk can be moved at a time
(B) A disk is slid oﬀ the top of one rod onto the next rod
(C) A disk can only be placed on top of a larger disk

Write a program to move the disks from the frst rod to the last using Stacks
*/
class StackWithLength extends Stack {
  constructor() {
    super();
    this.length = 0;
  }
  pop() {
    this.length--;
    return super.pop();
  }
  push(data) {
    this.length++;
    return super.push(data);
  }
}
function hanoiTower(plateCount = 3) {
  const stack0 = new StackWithLength();
  for (let i = plateCount; i > 0; --i) {
    stack0.push(i);
  }
  const stack1 = new StackWithLength();
  const stack2 = new StackWithLength();

  while (stack2.length < plateCount) {
    function conditionalMove(firstStack, secondStack) {
      if (!firstStack.peek()) {
        firstStack.push(secondStack.pop());
        // second stack to first
      } else if (!secondStack.peek() || firstStack.peek() < secondStack.peek()) {
        secondStack.push(firstStack.pop());
        // first stack to second
      } else {
        firstStack.push(secondStack.pop());
        // second stack to first
      }
    }
    stack2.push(stack0.pop());
    if (stack2.length === plateCount) {
      break;
    }
    conditionalMove(stack0, stack1);
    stack0.push(stack2.pop());
    conditionalMove(stack1, stack2);
    // 1 -> 2 or 2 -> 1?
  }
  return stack2;
}

// console.log(hanoiTower(5));


/*
Problem 3.5

Implement a MyQueue class which implements a queue using two stacks
*/

class MyQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.stackA = new Stack();
    this.stackB = new Stack();
  }
  enqueue(node) {
    if (!this.first) {
      this.first = node;
      this.last = node;
      this.stackA.push(node);
      return;
    }
    while (this.stackA.peek()) {
      this.stackB.push(this.stackA.pop());
    }

    this.stackA.push(node);
    this.last = node;

    while (this.stackB.peek()) {
      this.stackA.push(this.stackB.pop());
    }
  }
  dequeue() {
    const out = this.stackA.pop();
    this.first = this.stackA.peek();
    return out;
  }
}

const myQueue = new MyQueue();

// const values = [1, 2, 3];
// values.forEach((e) => myQueue.enqueue(e));
// console.log(myQueue);


/*
Problem 3.6

Write a program to sort a stack in ascending order.

You should not make any assumptions about how the stack is implemented

The following are the only functions that should be used to write this program:
push | pop | peek | isEmpty
*/

// nodes: 3, 8, 5, 6, 2
// This uses a helper data structure (binary search tree)
// function sortStackAsc(stack) {
//   function insertNode(node, head) {
//     // inserts nodes into a binary search tree
//     const direction = null;
//     if (node > head) {
//       direction = 'left';
//     } else {
//       direction = 'right';
//     }
//     if (head[direction]) {
//       insertNode(node, head[direction]);
//     } else {
//       head[direction] = node;
//     }
//     // if greater, go right
//     // if lesser or equal, go left
//   }

//   const head = stack.pop();
//   while (!stack.isEmpty()) {
//     const currNode = stack.pop();
//     insertNode(currNode, head);
//     // empty the stack, inserting all nodes into a binary search tree
//   }

//   function inOrder(head, action) {
//     // traverse bst depth-first, in-order and perform action for each node
//     if (head.left) {
//       inOrder(head.left, action);
//     }
//     action(head);
//     if (head.right) {
//       inOrder(head.right, action);
//     }
//     return;
//   }

//   inOrder(head, stack.push);
//   // traverse depth first and push each node back onto stack in order
//   return stack;
// }

// This uses sorting an array
function sortStackAsc(stack) {
  const stackArr = [];
  while (!stack.isEmpty()) {
    stackArr.push(stack.pop());
  }
  function mergeSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const left = [];
    const right = [];
    arr.forEach((e, i) => {
      if (i < Math.floor(arr.length/2)) {
        left.push(e);
      } else {
        right.push(e);
      }
    });
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
  }
  function merge(left, right) {
    let out = [];
    let l = 0;
    let r = 0;
    while (out.length < (left.length + right.length)) {
      if (!right[r] || left[l] < right[r]) {
        out.push(l);
        l++;
      } else if (!left[l] || right[r] <= left[l]) {
        out.push(r);
        r++;
      }
    }
    return out;
  }

  stackArr = mergeSort(stackArr);
  for (let i = stackArr.length - 1; i > 0; i--) {
    stack.push(stackArr[i]);
  }
  return stack;
}
