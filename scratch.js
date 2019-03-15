// nodes are non-negative integers
// balance tree in place (roughly O(1) space)


class SelfBalancingTree() {
  constructor() {
    this.targetDepth = 0;
    // lowest depth w/ open space
  }
  add(value) {
    //TODO;
    // on each add, count depth
    // if we're above maxDepth+1, rebalance, update maxDepth
    // possibly a stack to traverse back, or nodes with links to parent

    //navigate back up the tree, compare insertVal against parent
    // can parent be moved to reduce depth
    let insertNode = new Node(value);
    if (!this.head) {
      this.head = insertNode;
      this.maxDepth++;
      return;
    }
    let depth = 0;
    let currNode = tree.head;
    let wasInserted = false;
    function _insert(node) {
      if (node) {
        currNode = node;
      } else {
        node = insertNode;
      }
    }
    while (!wasInserted) {
      let direction;
      if (value > currNode.value) {
        _insert(currNode.right);
      } else {
        direction = 'left';
      }
      if (!currNode[direction]) {
        currNode[direction] = insertNode;
        wasInserted = true;
      } else {
        depth++;
        currNode = currNode[direction];
      }
    }
  }
}