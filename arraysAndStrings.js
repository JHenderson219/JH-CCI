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
// console.warn("isUniqueStr PART 1 results:", results);

// console.warn("isUniqueStr2 PART 2 results:", results2);


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
// console.warn('reversedStrArr', reversedStrArr);
// console.warn('strWithNulls', strArrWithNulls);

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
  // console.warn('test string is:', string, 'resultString is:', results3[index]);
  // console.assert(string == results3[index], {string, result: results3[index], errorMsg});
});


let duplicateArr = [
  "Clear",
  "has holes",
  "dude totally duped"
]
let validArr = [
  "Clear",
  "a ole",
  "oayp"
]
/*
  Question 1.3
  Design an algorithm and write code to remove the duplicate characters in a string
  without using any additional buffer. NOTE: One or two additional variables are fine.
  An extra copy of the array is not.
 
  FOLLOW UP
  Write the test cases for this method.
*/

/*
 SOLUTION NOTES
 This problem raises some questions, both generally and for implementation in JavaScript
 -What does additional buffer mean? Can we have no other data structure at all, or just not a new copy of the array?
 -Are there time or space complexity requirements or guidelines?
 -Can the string be null, empty, or another type at all?

 Each of the solutions below make their own assumptions about the answers to some of these questions, while sharing others

 Shared assumptions:
 -The variable type passed into these functions will always be a non-null string
 -The variable may be an empty string
 -The variable may be converted into an array via string.split() on the first line, and joined to a string via string.join on the last line 
    -This is so that the argument can be treated more like strings in other languages
    -However, the solutions will treat the converted string as if it were the passed-in argument, so not to provide an easy way around the core challenge

 Solution 1: No Additional Memory
 -No other comparable data structure may be used. IE no hashmaps, no sets, no arrays (except for the array created from the original). The input must be modifed in place.
 -The primary concern is space complexity, not time complexity.

 Solution 2: Additional memory allowed
 - Additional memory is allowed
 - The primary concern is time complexity, not space complexity.

*/

/*
* Solution 1: No Additional Memory 
* Time complexity: O(n^2)
* Space Complexity: O(n)
*/
function removeDuplicates(str) {
  if (str.length <= 1) return str;

  function removeAllInstances(stringArray, tgt) {
    // removes all instances of a tgt character from a stringArray
    stringArray.forEach((element, index, arr) => {
      if (element === tgt) {
        arr[index] = '';
      }
      // loop over the array, setting any element that matches tgt to empty
    });
  }

  str = str.split('');
  for (let i = 0; i < str.length; i++) {
    // Check each char in turn against the others
    for (let j = i+1; j < str.length; j++) {
      // always start second loop at i+1 to avoid checking chars that were already checked earlier
      if (str[i] === str[j]) {
        removeAllInstances(str, str[i]);
        // if a match is found, remove all instances of it
      }
    }
  }
  return str.join('');
}


/*
* Solution 2: With Additional Memory 
* Time Complexity: O(n)
* Space Complexity: O(n)
*/
function removeDuplicates(str) {
  if (str.length <= 1) return str;
  function getRemoveList(arr) {
    // gets a Set of characters to remove from the array
    let chars = new Set();
    let toRemove = new Set();
    // create sets for comparison
    for (let i = 0; i < arr.length; i++) {
      let char = arr[i];
      if (chars.has(char)) {
        toRemove.add(char);
        // if we already have an instance of this character in the list of character's we've seen, put it on the remove list
      } else {
        chars.add(char);
        // if we don't, add it to the list of character's we've seen
      }
    }
    return toRemove;
  }

  function removeCharacters(arr, removeList) {
    // removes all characters from an array that are in the removeList Set
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!removeList.has(arr[i])) {
        newArr.push(arr[i]);
        // if the remove list doesn't have an instance of the character we are currently on, add it to the array of characters to output
      }
    }
    return newArr;
  }

  let out = removeCharacters(str, getRemoveList(str));
  return out.join('');
}

// let results4 = duplicateArr.forEach((string, index) => {
//   console.warn('expecting:', validArr[index], 'result:', removeDuplicates(string));
// });


/**
 * Question 1.4
 * Write a method to decide if two strings are anagrams or not.
 */
function areAnagrams(str1, str2) {
  let set = new Set();
  let out = true;
  str1.split('').forEach(char => set.add(char));
  str1.split('').forEach(char => {
    if(!set.has(char)) {
      out = false;
    }
  })
  return out;
}

// console.log(areAnagrams('listen', 'silent'));


/** 
 * Question 1.5
 * Write a method to replace all spaces in a string with ‘%20’
 *
*/

function encodeSpaces(str) {
  return str.split('').map(char => char === ' ' ? '%20' : char).join('');
}

// console.log(encodeSpaces('this is a string with spaces'));
/*
Question 1.6 

Given an image represented by an NxN matrix, where each pixel in the image is 4
bytes, write a method to rotate the image by 90 degrees Can you do this in place?
*/
function createEmptyMatrix(n){
  let out = [];
  for (let i = 0; i < n; i++){
    let arr = [];
    for (let j = 0; j < n; j++) {
      arr.push(null);
    }
    out.push(arr);
  }
  return out;
}
function rotateImage(matrix) {
  let newMatrix = createEmptyMatrix(matrix.length);
  console.warn(newMatrix);
  for(let i = 0; i < matrix.length; i++) {
    for (let j = matrix.length-1; j > -1; j--){
      
      let index = Math.abs((matrix.length-1) - j);
      console.warn(matrix[j][i], j, i, index);
      newMatrix[i][index] = matrix[j][i];
    }
  }
  return newMatrix;
}

// let matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]
// console.log(rotateImage(matrix));


/*
Question 1.7 

Write an algorithm such that if an element in an MxN matrix is 0, its entire row and
column is set to 0

*/

function clearRowsAndColumns(matrix) {
  function matrixForEach(matrix, callback) {
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        callback(matrix[i][j], j, matrix[i], i, matrix);
      }
    }
  }
  function buildClearSets(element, elIndex, row, rowIndex) {
    if (element === 0) {
      clearRowSet.add(rowIndex);
      clearColumnSet.add(elIndex);
    }
  }
  let clearRowSet = new Set();
  let clearColumnSet = new Set();

  matrixForEach(matrix, buildClearSets);

  matrixForEach(matrix, (element, elIndex, row, rowIndex, matrix) => {
    if (clearRowSet.has(rowIndex) || clearColumnSet.has(elIndex)) {
      matrix[rowIndex][elIndex] = 0;
    }
  });

  return matrix;
}

let matrix = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,0],
  ]
console.log(clearRowsAndColumns(matrix))