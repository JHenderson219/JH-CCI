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
  _rotateRight(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    temp.isRed = temp.right.isRed;
    temp.right.isRed = true;
    return temp;
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

// const values = [6, 8, 2, 9, 3, 7];
// const tree = new RBTree();

// values.forEach((val) => {
//   tree.add(val);
// });


/*
    // Assuming that h is red and both h.right and h.right.left
    // are black, make h.right or one of its children red.
    private Node moveRedRight(Node h) {
        // assert (h != null);
        // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
        flipColors(h);
        if (isRed(h.left.left)) {
            h = rotateRight(h);
            flipColors(h);
        }
        return h;
    }


        // restore red-black tree invariant
    private Node balance(Node h) {
        // assert (h != null);

        if (isRed(h.right))                      h = rotateLeft(h);
        if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
        if (isRed(h.left) && isRed(h.right))     flipColors(h);

        h.size = size(h.left) + size(h.right) + 1;
        return h;
*/
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.balance = 0;
  }
}
class SBTree {
  constructor() {
    this.head = null;
    this.maxDepth = null;
  }
  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.maxDepth = 1;
      return;
    }
    this.head = this._add(node);
  }
  _add(node, compareNode = this.head) {
    if (!compareNode) {
      return node;
    }
    let direction = null;
    if (node.value < compareNode.value) {
      direction = 'left';
      compareNode.balance = compareNode.balance - 1;
    } else {
      direction = 'right';
      compareNode.balance = compareNode.balance + 1;
    }

    compareNode[direction] = this._add(node, compareNode[direction]);

    if (Math.abs(compareNode.balance) > 1) {
      let targetChild;
      if (compareNode.balance > 0) {
        targetChild = compareNode.right;
        if (targetChild.balance > 0) {
          compareNode = this.rotateLeft(compareNode);
        } else {
          console.log('rotate right then left');
          compareNode = this.rotateRightThenLeft(compareNode);
        }
      } else {
        targetChild = compareNode.left;
        if (targetChild.balance < 0) {
          compareNode = this.rotateRight(compareNode);
        } else {
          console.log('rotate left then right');
          compareNode = this.rotateLeftThenRight(compareNode);
        }
      }
    }
    return compareNode;
  }
  rotateRight(node) {
    const temp = node.left;
    const a = node.balance;
    const b = this.getBalance(temp) - 1;
    const c = this.getBalance(temp, 'right');
    node.left = this.getChild(temp, 'right');
    temp.right = node;
    node.balance = a - (b - c); // fix me
    let tempBal = 0;
    if (temp.left) {
      tempBal += this.getBalance(temp.left) - 1;
    }
    if (temp.right) {
      tempBal += this.getBalance(temp.right) + 1;
    }
    temp.balance = tempBal;
    return temp;
  }
  rotateLeft(node) {
    const temp = node.right;
    const a = node.balance;
    const b = this.getBalance(temp) + 1;
    const c = this.getBalance(temp, 'left');
    node.right = this.getChild(temp, 'left');
    temp.left = node;
    const cVal = b - c;
    // TODO: Fix this balancing stuff and add is done!
    node.balance = a - cVal;
    let tempBal = 0;
    if (temp.left) {
      tempBal += this.getBalance(temp.left) - 1;
    }
    if (temp.right) {
      tempBal += this.getBalance(temp.right) + 1;
    }
    temp.balance = tempBal;
    return temp;
  }
  rotateRightThenLeft(node) {
    node.right = this.rotateRight(node.right);
    return this.rotateLeft(node);
  }
  rotateLeftThenRight(node) {
    node.left = this.rotateLeft(node.left);
    return this.rotateRight(node);
  }
  getBalance(node, child) {
    if (!node || (child && !node[child])) {
      return 0;
    }
    if (child) {
      return node[child].balance;
    }
    return node.balance;
  }
  getChild(node, child) {
    if (!node || !node[child]) {
      return null;
    } else {
      return node[child];
    }
  }
}

const values = [1, 3, 5, 7, 9, 11, 13, 2, 6, 0];

const tree = new SBTree();
values.forEach((value) => tree.add(value));

console.log(tree);
