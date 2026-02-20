// * Different ways of creating functions in Js

// ? regular function
function add(a, b) {
  return a + b;
}

// Test the regular function
console.log(add(23, 5)); // 28

// ? giving it a variable name (to store its value)
const addExpression = function (a, b) {
  return a + b;
};
// ? arrow function
var add = (a, b) => {
  return a + b;
};
// ? more short
var add = (a, b) => a + b;

(function () {
  console.log("Prince is added!");
})(); //add();

let result = add(23, 5);
console.log(result);

// * Call Back
// * call back is a function that calls another function in it
// * after main function executes, other function will run
function callback() {
  console.log("Prince is added calling this function");
}

const add = function (a, b, callback) {
  var result = a + b;
  console.log("result:", result);
  callback();
};
//? add( ) is a main function, first it runs, then will call to callback function

add(2, 3, callback);
