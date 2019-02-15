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
