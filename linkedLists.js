/*
  Linked list setup
*/
class SinglyLinkedList { // eslint-disable-line
  constructor(elementsArray) {
    this.head = null;
    this.length = 0;
    this.Node = SingleNode;
    if (elementsArray) {
      elementsArray.forEach((element) => this.add(element));
    }
  }
  find(element) {
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.element === element) {
        return currNode;
      }
      currNode = currNode.next;
    }
    return null;
  }
  add(element) {
    const newNode = new this.Node(element);
    if (!this.head) {
      this.head = newNode;
    } else {
      let currNode = this.head;
      while (currNode.next) {
        currNode = currNode.next;
      }
      currNode.next = newNode;
    }
    this.length++;
  }
  remove(element) {
    if (this.head.element === element) {
      this.head = this.head.next;
      return this.head;
    }
    let currNode = this.head;
    while (currNode.next) {
      if (currNode.next.element === element) {
        currNode.next = currNode.next.next;
        return this.head;
      }
      currNode = currNode.next;
    }
  }
}
class SingleNode {
  constructor(element) {
    this.next = null;
    this.element = element || null;
  }
}

class DoublyLinkedList extends SinglyLinkedList {
  constructor() {
    super();
    this.Node = DoubleNode;
  }
}

class DoubleNode extends SingleNode {
  constructor(element) {
    super(element);
    this.prev = null;
  }
}

const VALUES = [23, 6, 8, 9, 2, 21, 9, 42, 23, 12];

const list = new SinglyLinkedList();
VALUES.forEach((value) => list.add(value));

/*
Question 2.1
Write code to remove duplicates from an unsorted linked list
FOLLOW UP
How would you solve this problem if a temporary buﬀer is not allowed?
*/
// expected output = [2,6,7,8,21,42,23,12];

// with Buffer:
function removeDuplicates(head) {
  const values = new Set();
  let currNode = list.head;
  values.add(currNode.element);
  while (currNode.next) {
    if (values.has(currNode.next.element)) {
      currNode.next = currNode.next.next;
    } else {
      values.add(currNode.next.element);
      currNode = currNode.next;
    }
  }
  return head;
}
// removeDuplicates(list.head);
// console.log(list);

// Without buffer:
// TODO: Finish me.
function removeDuplicates2(list) {
  const head = list.head;
  // sort list
  let currentNode = head;
  let isHead = true;
  while (currentNode.next) {
    if (currentNode.element > currentNode.next.element) {
      const lesser = currentNode.next;
      currentNode.next = lesser.next;
      lesser.next = currentNode;
      currentNode = lesser;
      if (isHead) list.head = currentNode;
    } else {
      currentNode = currentNode.next;
    }

    // compare currentNode.element to currentNode.next.element
    isHead = false;
  }
  // check each element in turn
  // delete dupes
}

// removeDuplicates2(list);
// console.log(list);

/*
Question 2.2

Implement an algorithm to fnd the nth to last element of a singly linked list

*/

function linkedListSlice(list, n) {
  const slice = new SinglyLinkedList();
  let currNode = list.head;
  const startSlice = list.length - n;
  let currIndex = 1;
  while (currNode.next) {
    if (currIndex >= startSlice) {
      slice.add(currNode.element);
    }
    currIndex++;
    currNode = currNode.next;
  }
  return slice;
}


// console.log(linkedListSlice(list, 5));


/*
Question 2.3

Implement an algorithm to delete a node in the middle of a single linked list
given only access to that node
*/
function getThirdNode(list) {
  let index = 1;
  let currNode = list.head;
  while (index < 3) {
    currNode = currNode.next;
    index++;
  }
  return currNode;
}
function deleteNode(node) {
  if (!node || !node.next) {
    throw new Error('Node or next node is null. Failed to delete node');
  }
  node.element = node.next.element;
  node.next = node.next.next;
  return;
}

// deleteNode(getThirdNode(list));

// console.log(list);


/*
Question 2.4

You have two numbers represented by a linked list,
where each node contains a single digit.

The digits are stored in reverse order,
such that the 1’s digit is at the head ofthe list.

Write a function that adds the two numbers and returns the sum as a linked list

EXAMPLE
Input: (3 -> 1 -> 5) + (5 -> 9 -> 2)
Output: 8 -> 0 -> 8
*/

const list1 = new SinglyLinkedList([2, 1, 5]);
const list2 = new SinglyLinkedList([5, 9, 2]);
function addLists(list1, list2) {
  function multByTens(times) {
    let out = 1;
    for (let i = 0; i < times; i++) {
      out = out * 10;
    }
    return out;
  }
  function getNumberFromList(list) {
    let currNode = list.head;
    let currIndex = 0;
    let currMultiplier = 1;
    let out = 0;
    while (currNode) {
      out += currNode.element * currMultiplier;
      currIndex++;
      currMultiplier = multByTens(currIndex);
      currNode = currNode.next;
    }
    return out;
  }
  const sumStr = (getNumberFromList(list1) + getNumberFromList(list2)) + '';
  let currNode = null;
  let head = null;
  const makeNode = (element) => {
    return {
      next: null,
      element,
    };
  };
  for (let i = sumStr.length - 1; i > -1; i--) {
    const newNode = makeNode(sumStr[i]);
    if (currNode) {
      currNode.next = newNode;
    }
    if (!head) {
      head = newNode;
    }
    currNode = newNode;
  }
  console.warn(head);
  // add them together
  // convert string to linked list - index thru and create
}

console.log(addLists(list1, list2));
