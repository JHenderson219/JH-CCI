/*
Problem 8.1

Write a method to generate the nth Fibonacci number.
*/

function getFib(nth) {
  if (nth === 0 || nth === 1) {
    return nth;
  }
  let num = 1;
  let tmp = 0;
  let last = 0;
  let i = 2;
  function fib() {
    if (i === nth) {
      return;
    }
    tmp = num;
    num += last;
    last = tmp;
    i++;
    fib();
  }
  fib();
  return num;
}


/*
Problem 8.2

Imagine a robot sitting on the upper left hand corner of an NxN grid.
The robot can only move in two directions: right and down.

How many possible paths are there for the robot?

*/

function numPaths(gridSize) {
  if (gridSize === 1) {
    return 1;
  }
  return (Math.pow(gridSize, 2) - 1) + numPaths(gridSize - 1);
  // grid size 1  = 1
  // grid size 2 = 3
  // grid size 3 = 8
}

// console.log(numPaths(3));

/*
FOLLOW UP
Imagine certain squares are “off limits”, such that the robot can not step on them
Design an algorithm to get all possible paths for the robot
*/
const grid2 = [
  [true, false],
  [true, true],
];
const grid3 = [
  [true, false, true],
  [true, true, true],
  [false, true, true],
];

function numPathsOffLimits(grid) {
  const paths = [];
  function getPaths(row, col, currPath = []) {
    if (currPath.length > 0) {
      paths.push(currPath);
    }
    currPath = currPath.slice();
    const nextRight = grid[row][col + 1];
    const nextDown = grid[row + 1] ? grid[row + 1][col] : null;
    if (nextRight && nextDown) {
      const rightPath = currPath.slice();
      rightPath.push('right');
      const downPath = currPath.slice();
      downPath.push('down');
      getPaths(row, col+1, rightPath);
      getPaths(row+1, col, downPath);
    } else if (nextRight) {
      currPath.push('right');
      getPaths(row, col+1, currPath);
    } else if (nextDown) {
      currPath.push('down');
      getPaths(row+1, col, currPath);
    }
  }
  getPaths(0, 0, []);
  return paths;
}

console.log(numPathsOffLimits(grid3));
