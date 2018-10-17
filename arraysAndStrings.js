/*
if string has all unique characters return true
else, return false
space characters don't count, but special characters and numbers do
this version should priortize minimizing time complexity
another version will prioritize minimizing space complexity
*/

function isUniqueStr(str) {

}

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

console.log(results);