/*
Additional Practice

Self-Balancing Binary Search tree

*/
class RBNode {
  constructor(amt) {
    this.amt = amt;
    this.left = null;
    this.right = null;
    this.isRed = true;
  }
  addChild(node) {
    let direction = 'left';
    if (node.amt > this.amt) {
      direction = 'right';
    }
    if (this[direction]) {
      this[direction].addChild(node);
    } else {
      this[direction] = node;
    }
  }
}
class RBTree {
  constructor() {
    this.head = null;
  }
  add(value) {
    const newNode = new RBNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.head.addChild(newNode);
    }
    if (!this._isBalanced()) {
      this._rebalance();
    }
  }
  _isBalanced() {
    const out = true;
    const currNode = this.head;
    while (out) {

    }
    return out;
  }
  delete() {
    // todo
  }
}

const values = [6, 8, 2, 9, 3, 7];
const tree = new RBTree();

values.forEach((val) => {
  tree.add(val);
});


