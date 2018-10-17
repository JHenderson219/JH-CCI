/*
Question 1.1
Implement an algorithm to determine if a string has all unique characters. What if you
can not use additional data structures?
*/


/*
Problem Notes
if string has all unique characters return true
else, return false
*/


/*
Question 1.1
PART 1 - Additional data structures allowed
*/
function isUniqueStr(str) {
  // set isUnique to true by default
  let isUnique = true;
  // initialize new set
  let charSet = new Set();
  // loop through string
  for (let i = 0; i < str.length;  i++) {
    //for each character, see if it exists in the set
    if (charSet.has(str[i])) {
        // if it does, character is not unique, so set isUnique to false
      isUnique = false;
    } else {
      // if it doesn't, add it to the set
      charSet.add(str[i]);
    }
  }
  return isUnique;
}
/*
  Worst case time complexity O(n)
  Best case time complexity O(n)
  Space complexity O(n)
*/

/**
Question 1.1
PART 2 - NO additional data structures allowed
*/
function isUniqueStr2(str) {
  let isUnique = true;
  let index = 0;

  while (index < str.length && isUnique) {
    // while index hasn't reached end of string
    for (let i = index+1; i < str.length; i++) {
      // loop from index to end of string
      if (str[index] === str[i]) {
        isUnique = false;
      }
    }
    index++;
  }
  return isUnique;
}
/*
Worst case time complexity O(n^2)
Best case time complexity O(n) or less
Space complexity none
*/

let strArr = [
  "yes", //true
  "good", //false
  "hEllO", // false
  "thisisav4ryL0ngstringw1thRepeatingcharacters", // false
  "2754638721902474673493201", // false
  "231", //true
  "why&*@#stop", // true
  "ifkj&hyli#&*", // false
  "this am", //true
  "is a sentance", //false
];

let results = strArr.map(element => isUniqueStr(element));
let results2 = strArr.map(element => isUniqueStr2(element));
console.log("isUniqueStr PART 1 results:", results);

console.log("isUniqueStr2 PART 2 results:", results2);