/* eslint-disable indent */
// nodes are non-negative integers
// balance tree in place (roughly O(1) space)


class SelfBalancingTree {
  constructor() {
    this.targetDepth = 0;
    // lowest depth w/ open space
  }
  add(value) {
    // TODO;
    // on each add, count depth
    // if we're above maxDepth+1, rebalance, update maxDepth
    // possibly a stack to traverse back, or nodes with links to parent

    // navigate back up the tree, compare insertVal against parent
    // can parent be moved to reduce depth
    const insertNode = new Node(value);
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


// var foo1 = 'foo1';
// let bar1 = 'bar1';
// const baz1 = 'baz1';
// console.log('first set global:', foo1, bar1, baz1);
// // console.log('second set global:', foo2, bar2, baz2); // throws an error
// // console.log('third set global:', foo3, bar3, baz3); // throws an error
// function bat() {
//   var foo2 = 'foo2';
//   let bar2 = 'bar2';
//   const baz2 = 'baz2';
//   console.log('first set function:', foo1, bar1, baz1);
//   console.log('second set function:', foo2, bar2, baz2);
//   console.log('third set function', foo3);
//   // console.log(bar3); // throws an error
//   // console.log(baz3); // throws an error
//   if (true) {
//     var foo3 = 'foo3';
//     let bar3 = 'bar3';
//     const baz3 = 'baz3';
//     console.log('first set block:', foo1, bar1, baz1);
//     console.log('second set block:', foo2, bar2, baz2);
//     console.log('third set block:', foo3, bar3, baz3);
//   }
// }
// bat();


// 8.1 Write a method to generate the nth Fibonacci number

function fib(nth, curr = 1, last = 0, value = 1) {
  if (nth === 1) {
    return 1;
  }
  if (nth === curr) {
    return value;
  }
  return fib(nth, curr + 1, value, value + last);
}


function checkCashRegister(price, cash, cid) {
  const due = (cash - price) * 100;
  const drawer = cid.slice().map((category, index) => {
    const value = category[1] * 100;
    const name = category[0];
    return [name, value];
  });
  let currChange = 0;
  const change = [];

  const values = new Map([
    ['ONE HUNDRED', 10000],
    ['TWENTY', 2000],
    ['TEN', 1000],
    ['FIVE', 500],
    ['ONE', 100],
    ['QUARTER', 25],
    ['DIME', 10],
    ['NICKEL', 5],
    ['PENNY', 1],
  ]);
  // for each category (starting with 100s)
  for (let i = cid.length - 1; i > -1; i--) {
    const categoryName = drawer[i][0];
    const categoryValue = values.get(categoryName);
    let changeCategoryValue = 0;
    while (due - currChange >= categoryValue && currChange != due && drawer[i][1] > 0) {
      currChange += categoryValue;
      drawer[i][1] -= categoryValue; // total remianing in category
      changeCategoryValue += categoryValue;
    }
    if (changeCategoryValue > 0) {
      change.push([categoryName, changeCategoryValue]);
    }
    // console.log(currChange, due, change);
  }
  if (currChange != due) {
    return {status: 'INSUFFICIENT_FUNDS', change: []};
  }

  if (drawer[0][1] === 0) { // pennies are out
    return {status: 'CLOSED', change: cid};
  }
  const outputChange = change.map((category) => {
    const name = category[0];
    const value = parseFloat((category[1] / 100).toFixed(2));
    return [name, value];
  });
  return {status: 'OPEN', change: outputChange};
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// checkCashRegister(19.5, 20, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]);

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// console.log(checkCashRegister(19.5, 20, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]));
/*
\d{3}-\d{3}-\d{4}
\d |\-\d{3}-\d{3}-\d{4}
555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
1 555-555-5555
*/

// function telephoneCheck(str) {
//   // Good luck!
//   if (!str[0].match(/([0-9]|\()/gm)) {
//     return false;
//   }
//   const isValidChar = (char) => {
//     if (char.match(/([0-9]|\(|\)|\-)/gm)) {
//       return true;
//     }
//     return false;
//   };
//   const isParen = (char) => {
//     if (char === '(' || char === ')') {
//       return true;
//     }
//     return false;
//   };
//   const checkValidWithParen = () => {

//   };
//   let i = 0;
//   while (i < str.length) {
//     const char = str[i];
//     if (!isValidChar(char)) {
//       return false;
//     }
//     if (isParen(char)) {
//       // do paren tasks
//     }

//     i++;
//   };

//   // first char paren
//     // 3 nums, close paren
//       // optional space + 3 nums
//         // -
//           // 4 nums
//   // first char num
//     // paren
//       // 3 nums, close paren
//         // optional space + 3 nums
//           // -
//             // 4 nums
//     // num
//       // 9 more nums
//       // 6 more nums
//       // optional space + paren
//         // 3 nums, close paren
//           // optional space + 3 nums
//            // -
//             // 4 nums
//   return true;
// }

// console.log(telephoneCheck('555-555-5555'));

function bin2Int(binStr) {
  // convert binary string to integer
  // take last digit, that provides +1 or +0
  let int = 0;
  for (let i = 0; i < binStr.length; i++) {
    const digit = parseInt(binStr[i]);
    int += digit*Math.pow(2, binStr.length - 1 - i);
  }

  // for each digit
    // += digit*2Math.pow(place in string (inverse of index))
  return int;
}

// console.log(bin2Int('100')); // 4
// console.log(bin2Int('100010')); // 34
// console.log(bin2Int('1011000101')); // 709
// console.log(bin2Int('10110101')); // 181

// function bar() {
//   console.log('function bar called. context is', this);
//   return () => {
//     console.log('function returend from bar called. context is:', this);
//   }
// }
// const test = () => {
//   console.log('arrow function test called. context is', this);
// };
// function foo() {
//   console.log('function foo called. context is', this);
//   test();
// }
// function baz() {
//   bar()();
// }
// test();
// foo();
// baz();

// class Foo {
//   method() {
//     (() => {
//       console.log(this);
//     })();
//   }
//   bar() {
//     return () => {
//       console.log(this);
//     };
//   }
// }
// const bop = () => {
//   console.log(this);
// }
// class Baz {
//   method() {
//     return (new Foo).bar();
//   }
//   bar() {
//     return bop;
//   }
// }
// (new Baz).bar()();

// console.log(this);