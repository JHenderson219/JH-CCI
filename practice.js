/*
Binary & non binary trees
  Breadth-first
    in-order
    pre-order
    post-order


  Depth-first

Sorting Algorithms
  Merge
  Heap
*/
class Node {
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.data = value;
  }
}
class BinaryTree {
  constructor(initial = []) {
    if (!initial.length) {
      initial = [initial];
    }
    initial.forEach((value, index) => {
      this.add(value);
    });
  }
  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      return;
    }
    const traverse = () => {

    };
    const currNode = this.head;
    if (value > currNode.value) {
      // go right
    } else {
      // go left
    }
  }
}
function inOrderBinary(head) {
  if (head.left) {
    inOrder(head.left);
  }
  // do action
  if (head.right) {
    inOrder(head.right);
  }
}

function preOrderBinary(head) {
  // do action
  if (head.left) {
    preOrder(head.left);
  }
  if (head.right) {
    preOrder(head.right);
  }
}
function postOrderBinary(head) {
  if (head.left) {
    postOrder(head.left);
  }
  if (head.right) {
    postOrder(head.right);
  }
  // do action
}
function depthFirstBinary(head) {
  const children = [];
  if (head.left) {
    children.push(head.left);
  }
  if (head.right) {
    children.push(head.right);
  }
  children.forEach((child) => {
    depthFirstBinary(child);
  });
}

function preOrderNonBinary(head) {
  if (head.children) {
    head.children.forEach((child) => preOrderNonBinary(child));
  }
  // do action
}

function postOrderNonBinary(head) {
  if (head.children) {
    for (let i = head.children.length; i > 0; --i) {
      const child = head.children[i];
      postOrderNonBinary(child);
    }
  }
  // do action
}


// Memoize

function expensiveNetworkRequest(params) {
  // Does not matter what this does
}

function memoize(func, param) {
  const cache = new Map();
  let out;
  if (cache.has(key)) {
    out = cache.get(key);
  } else {
    out = func(key);
  }
  return out;
}

function memoize(func) {
  const cache = new Map();
  let out;
  return (input) => {
    if (cache.has(input)) {
      out = cache.get(input);
    } else {
      out = func(input);
    }
    return out;
  };
}

// Secret Santa

/*

One Christmas season a group of friends decides that they don't have money for everyone to give everyone else a gift. Instead they will arrange it so that everyone gives one gift, and everyone gets one gift.

Everyone puts their names on slips of paper and puts them in a hat. Each takes a turn drawing a name out of the hat.

There are three requirements for the gift assignments:

Everyone gives a gift.

Everyone gets a gift.

No one gives to themselves.

The assignments are unpredictable.

Write a function named ssanta that takes an array of strings--friends--and returns an object describing the gift giving assignments.

For example, if I call the funtion with the list ['Gene', 'Kim', 'Pat'] then it should return an object like {Gene: 'Pat', Kim: 'Gene', Pat: 'Kim'}.

*/

const friends = ['Gene', 'Kim', 'Pat', 'Lizz', 'James'];

function sSanta(friends) {
  let randStart = Math.ceil(Math.random() * friends.length - 1) || 1;
  let i = 0;
  const assignments = new Map();
  while (i < friends.length) {
    const giver = friends[i];
    const reciever = friends[randStart];
    assignments.set(giver, reciever);
    i++;
    randStart++;
    if (randStart > friends.length - 1) {
      randStart = 0;
    }
  }
  return assignments;
}

console.log(sSanta(friends));
// console.log(Math.floor(Math.random() * 4));
