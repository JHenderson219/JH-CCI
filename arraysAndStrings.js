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
  "is a sentence", //false
];

let results = strArr.map(element => isUniqueStr(element));
let results2 = strArr.map(element => isUniqueStr2(element));
// console.log("isUniqueStr PART 1 results:", results);

// console.log("isUniqueStr2 PART 2 results:", results2);


/*
  Question 1.2
  Write code to reverse a C-Style string (C-String means that "abcd" is represented as five characters, including the null character)
*/
// JS-style reversal for comparison to actual answers later
let reversedStrArr = strArr.map(element => element.split('').reverse().join(''));

// C-style strings with null terminators
let strArrWithNulls = strArr.map(element => {
  let arr = element.split('');
  arr.push(null);
  return arr;
});
// console.log('reversedStrArr', reversedStrArr);
// console.log('strWithNulls', strArrWithNulls);

/*
  Worst case time complexity O(n)
  Best case time complexity O(n)
  Space complexity O(n)
*/
function reverse(arr) {
  let length = arr.length-2;
  let newArr = [];
  // start at end of the original array, -2 indices to avoid null terminator
  for (let i = length; i > -1; i--) {
    // push each value from end of the array to start, including index 0
    newArr.push(arr[i]);
  }
  // finally, push a null onto the end of the array
  newArr.push(null);
  return newArr;
}

let results3 = strArrWithNulls.map(arr => reverse(arr).join(''));

reversedStrArr.forEach((string, index) => {
  // compare against matching index in joined arrays from function output
  let errorMsg = "The strings do not match";
  // console.log('test string is:', string, 'resultString is:', results3[index]);
  // console.assert(string == results3[index], {string, result: results3[index], errorMsg});
});


let duplicateArr = [
  "Clear",
  "has holes",
  "isAProperCamelCaseSentence",
  "maybeHasBigMoleWholesWherever"
]
let validArr = [
  "Clear",
  "ha ole",
  "iAPopCmlStc",
  "ybHBigv"
]
/*
  Question 1.3
  Design an algorithm and write code to remove the duplicate characters in a string
  without using any additional buffer. NOTE: One or two additional variables are fine.
  An extra copy of the array is not.
 
  FOLLOW UP
  Write the test cases for this method.
*/

function removeDuplicates(str) {
  let length = str.length;
  let index = 0;
  let out = '';
  while (index < length) {
    let currentChar = [];
    for (let i = index; i < length; i++) {

    }
  }
  return out;
}

let results4 = duplicateArr.forEach((string, index) => {
  console.log('expecting:', validArr[index], 'result:', removeDuplicates(string));
});
