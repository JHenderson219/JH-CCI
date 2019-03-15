

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
// let values = [3, 7, 2, 4, 5, 1];

// function makeTree(arr) {
//   const tree = new Tree();
//   arr.forEach((value) => {
//     const node = new Node(value);
//     tree.add(node);
//   });
//   return tree;
// }

// const tree = makeTree(values);
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
Problem 4.2

Given a directed graph, design an algorithm to fnd out whether there is a route between two nodes
*/


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
// const heads = breadthFirstLinkedList(tree.head);
// console.log(heads);

/*
Problem 4.5

Write an algorithm to fnd the ‘next’ node (i e , in-order successor) of a given node in
a binary search tree where each node has a link to its parent
*/

function findNext(inputNode) {
  // get parent until find head (parent == null)
  const head = (function getHead(node) {
    if (!node.parent) {
      return node;
    }
    getHead(node.parent);
  })(inputNode);

  // in-order traverse to find original node
  // next node we hit is our result
  return (function findNextNode(node, shouldReturn = false) {
    if (node === inputNode) {
      shouldReturn = true;
      // return next node traversed to
    }
    if (shouldReturn) {
      return node;
    }
    if (node.left) {
      findNextNode(node.left, shouldReturn);
    }
    if (node.right) {
      findNextNode(node.right, shouldReturn);
    }
  })(head);
}

/*
Problem 4.6

Design an algorithm and write code to find the frst common ancestor of two nodes
in a binary tree

Avoid storing additional nodes in a data structure

NOTE: This is not necessarily a binary search tree

*/

/*
 Assumptions:
 Nodes are not linked to their parents
 Storing a few nodes in individual variables is fine - helper data structures with tons of nodes are not (prioritize space efficency)
 The tree is not a binary search tree
*/

function findAncestor(head, node1, node2) {
  const foundNode1 = false;
  const foundNode2 = false;
  function findPathToNode(node, tgtNode, path = []) {
    if (node === tgtNode) {
      if (node === head) {
        throw new Error('Head has no ancestors');
      }
      return path;
    }
    if (node.left) {
      path.push('left');
      postOrderTraverse(node.left);
    }
    if (node.right) {
      path.push('right');
      postOrderTraverse(node.right);
    }
  }
  const path1 = findPathToNode(head, node1);
  const path2 = findPathToNode(head, node2);
  const ancestorPath = [];
  const shortestLength = path1.length > path2.length ? path2.length : path1.length;
  for (let i = 0; i < shortestLength; i++) {
    if (path1[i] === path2[i]) {
      ancestorPath.push(path1[i]);
    }
  }
  const ancestor = head;
  ancestorPath.forEach((direction) => {
    ancestor = node[direction];
  });
  return ancestor;
}


/*
Problem 4.7

You have two very large binary trees: T1, with millions of nodes, and T2, with hundreds of nodes

Create an algorithm to decide if T2 is a subtree of T1

*/

function isSubtree(largeTree, smallTree) {
  const commonHeadLargeTree = null;
  function findHead(compareHead, tgtHead) {
    const currNode = compareHead;
    while (currNode.left) {
      if (commonHeadLargeTree) {
        break;
      }
      if (currNode === tgtHead) {
        // could also compare values if comparing pointers won't work
        commonHeadLargeTree = currNode;
      }
      currNode = currNode.left;
    }
    while (currNode.right) {
      if (commonHeadLargeTree) {
        break;
      }
      if (currNode === tgtHead) {
        commonHeadLargeTree = currNode;
      }
      currNode = currNode.right;
    }
    return;
  }
  findHead(largeTree.head, smallTree.head);
  if (!commonHeadLargeTree) {
    return false;
  }
  function validateSubtree(commonHeadLargeTree, smallTree) {
    const currNodeLarge = commonHeadLargeTree;
    const currNodeSmall = smallTree.head;
    let isSubtree = true;
    function checkTree() {
      if (!isSubtree) {
        return;
      }
      if (currNodeLarge !== currNodeSmall) {
        isSubtree = false;
        return;
      }
      if (currNodeSmall.left) {
        currNodeLarge = currNodeLarge.left;
        currNodeSmall = currNodeSmall.left;
        checkTree();
      }
      if (currNodeSmall.right) {
        currNodeLarge = currNodeLarge.right;
        currNodeSmall = currNodeSmall.right;
        checkTree();
      }
    }
    checkTree();
    return isSubtree;
  }
  return validateSubtree(commonHeadLargeTree, smallTree);
}


/*
Problem 4.8

You are given a binary tree in which each node contains a value. Design an algorithm to print all paths which sum up to that value

Note that it can be any path in the tree - it does not have to start at the root
*/


function findSumPaths(tree, tgtSum) {
  const paths = [];
  function preOrder(node, currSum = 0, path = []) {
    currSum += node.value;
    if (currSum === tgtSum) {
      paths.push(path);
    }
    for (let i = path.length - 1; i > 0; i--) {
      const tempPath = path.slice(i);
      const startPath = path.slice(0, i);
      const tempSum = sumPath(tempPath, getStartNode(startPath));
      if (tempSum === tgtSum) {
        tempPath.push(paths);
      }
    }
    if (node.left) {
      path.push('left');
      preOrder(node.left, currSum, path.slice(0));
    }
    if (node.right) {
      path.push('right');
      preOrder(node.right, currSum, path.slice(0));
    }
  }
  function getStartNode(startPath) {
    let currNode = tree.head;
    startPath.forEach((direction) => {
      currNode = node[direction];
    });
    return currNode;
  }
  function sumPath(pathArr, node = tree.head) {
    let sum = 0;
    pathArr.forEach((direction) => {
      sum += node.value;
      node = node[direction];
    });
    return sum;
  }
  preOrder(tree.head);
  return paths;
}


