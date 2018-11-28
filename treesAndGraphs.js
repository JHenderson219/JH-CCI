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