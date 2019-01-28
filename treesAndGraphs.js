/*
Tree basics
*/

class Node {
  constructor(value) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.head = null;
  }
  add(newNode, root = this.head) {
    if (!this.head) {
      this.head = newNode;
      return;
    }
    if (!root) {
      root = newNode;
    } else if (root === newNode) {
      root.value = newNode.value;
    } else if (root.value > newNode.value) {
      if (!root.left) {
        root.left = newNode;
        return;
      }
      this.add(newNode, root.left);
    } else {
      if (!root.right) {
        root.right = newNode;
        return;
      }
      this.add(newNode, root.right);
    }
  }
  delete() {

  }
}
const values = [3, 7, 2, 4, 5, 1];

function makeTree(arr) {
  const tree = new Tree();
  arr.forEach((value) => {
    const node = new Node(value);
    tree.add(node);
  });
  return tree;
}

const tree = makeTree(values);
// console.log(tree);
/**
 * Traverse a tree pre-order, perform callback on each node
 *
 * @param {*} root
 * @param {*} callback
 * @return {*}
 */
// eslint-disable-next-line
function preOrderTraverse(root, callback) {
  if (!root) {
    return;
  }
  callback(root);
  // or send a value to another structure, or print it, whatever
  let node;
  if (node.left) {
    preOrderTraverse(node.left);
  } else if (node.right) {
    preOrderTraverse(node.left);
  } else {
    return;
  }
}

/**
 * Traverse a tree in order, perform callback on each node
 *
 * @param {*} root
 * @param {*} callback
 * @return {*}
 */
function inOrderTraverse(root, callback) {
  if (!root) {
    return;
  }
  if (root.left) {
    inOrderTraverse(root.left, callback);
  }
  callback(root.value);
  if (root.right) {
    inOrderTraverse(root.right, callback);
  }
  return;
}
// inOrderTraverse(tree.head, console.log);

function postOrderTraverse(root, callback) {
  if (!root) {
    return;
  }
  if (root.right) {
    postOrderTraverse(root.right, callback);
  }
  callback(root.value);
  if (root.left) {
    postOrderTraverse(root.left, callback);
  }
  return;
}
// postOrderTraverse(tree.head, console.log);

// function breadthFirstTraverse(root, callback) {
//   if (!root) {
//     return;
//   }
//   const nodes = [root];
//   function getNodes(oldNodes) {
//     let newNodes = [];
//     oldNodes.forEach((node) => {
//       if (node.left) {
//         newNodes.push(node.left);
//       }
//       if (node.right) {
//         newNodes.push(node.right);
//       }
//       if (newNodes.length > 0) {
//         newNodes = newNodes.concat(getNodes(newNodes));
//       }
//       return oldNodes.concat(newNodes);
//     });
//   }
//   const printNodes = getNodes(nodes);
//   printNodes.forEach((node) => {
//     callback(node.value);
//   });
//   return printNodes;
// }
function breadthFirstTraverse(root, callback) {
  const nodes = [[root]];

  function getChildren(nodeArr) {
    nodeArr.forEach((node) => {
      const newArr = [];
      if (node.left) {
        newArr.push(node.left);
      }
      if (node.right) {
        newArr.push(node.right);
      }
      nodes.push(newArr);
      getChildren(newArr);
    });
  }

  getChildren(nodes[0]);
  return nodes.reduce((prev, curr) => {
    return prev.concat(curr);
  }, []);
}

// console.log(breadthFirstTraverse(tree.head).map((node) => node.value));


/*
Problem 4.1

Implement a function to check if a tree is balanced For the purposes of this question,
a balanced tree is defned to be a tree such that no two leaf nodes diﬀer in distance
from the root by more than one
*/

function isBalanced(root) {
  let out = true;
  let deepest = 0; // int
  let current = 0; // int

  function checkBalance(deepestDepth, currentDepth) {
    if (deepestDepth - currentDepth > 1 || deepestDepth - currentDepth < -1) {
      out = false;
    }
  }
  function findDepth(rootNode) {
    if (!rootNode.depth) {
      rootNode.depth === current;
      current++;
    } else {
      current = rootNode.depth;
    }
    if (rootNode.left) {
      findDepth(rootNode.left);
    }
    if (rootNode.right) {
      findDepth(rootNode.right);
    }
    if (!rootNode.left && !rootNode.right) {
      // if deepest - current > 1 || deepest - current < -1, tree is unbalanced, set false flag
      checkBalance(deepestDepth, currentDepth);
      if (current > deepest) {
        deepest = current;
      }
      return;
    }
  }
  findDepth(root);
  return out;
}


/*
  Problem 4.3

Given a sorted (increasing order) array, write an algorithm to create a binary tree with
minimal height
*/

function minHeightTree(arr = []) {
  const mid = Math.floor((arr.length - 1) / 2);
  const root = new Node(arr[mid]);

  const leftArr = arr.slice(0, mid);
  if (leftArr.length > 0) {
    root.left = minHeightTree(leftArr);
  }

  const rightArr = arr.slice(mid + 1, arr.length);
  if (rightArr.length > 0) {
    root.right = minHeightTree(rightArr);
  }

  return root;
}
const testArr = [1, 2, 3, 4, 5, 6, 7];

// console.log(minHeightTree(testArr));

/*
Problem 4.4

Given a binary search tree, design an algorithm which creates a linked list of all the
nodes at each depth (i e , if you have a tree with depth D, you’ll have D linked lists)
*/

function breadthFirstLinkedList(root) {
  const listHeads = [root];
  function makeList(nodes) {
    const tempList = [];
    nodes.forEach((node) => {
      if (node.left) {
        tempList.push(node.left);
      }
      if (node.right) {
        tempList.push(node.right);
      }
      if (tempList.length > 0) {
        const listHead = tempList[0];
        listHeads.push(listHead);
        tempList.forEach((node, index) => {
          assignNext(node, index);
        });
        makeList(tempList);
      }
    });

    function assignNext(node, index) {
      node.next = null;
      if (index < tempList.length) {
        const nextNode = tempList[index + 1];
        node.next = nextNode;
      }
    }
  }
  makeList(listHeads);
  return listHeads;
}
const heads = breadthFirstLinkedList(tree.head);
console.log(heads);
