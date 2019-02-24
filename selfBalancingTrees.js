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
}
class RBTree {
  constructor() {
    this.head = null;
  }
  add(amt) {
    const newNode = new RBNode(amt);
    if (!this.head) {
      this.head = newNode;
      this.head.isRed = false;
    } else {
      this._add(newNode, this.head);
    }

    this.head.isRed = false;
  }
  _add(newNode, compareNode) {
    if (!compareNode) {
      return newNode;
    }
    if (newNode.amt < compareNode.amt) {
      compareNode.left = this._add(newNode, compareNode.left);
    } else {
      compareNode.right = this._add(newNode, compareNode.right);
    }

    if (this._isRed(compareNode.right) && !this._isRed(compareNode.left)) {
      compareNode = this._rotateLeft(compareNode);
    }

    if (this._isRed(compareNode.left) && this._isRed(compareNode.left.left)) {
      compareNode = this._rotateRight(compareNode);
    }

    if (this._isRed(compareNode.left) && this._isRed(compareNode.right)) {
      this._flipColors(compareNode);
    }
    return compareNode;
  }
  _rotateLeft(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    temp.isRed = temp.left.isRed;
    temp.left.isRed = true;
    return temp;
  }
  _rotateRight() {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    temp.isRed = temp.right.isRed;
    temp.right.isRed = true;
  }
  _flipColors(node) {
    node.isRed = !node.isRed;
    node.left.isRed = !node.left.isRed;
    node.right.isRed = !node.right.isRed;
  }
  _isRed(node) {
    return node ? node.isRed : false;
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


