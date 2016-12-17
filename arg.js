// function sum() {
//   let total = 0;
//   for (var i = 0; i < arguments.length; i++) {
//     total += arguments[i];
//   }
//   return total;
// }
//
//
// function sum2(...args) {
//   return args.reduce( function (a, b) {
//     return a + b;
//   }, 0);
// }
//
// // console.log(sum2(1, 2, 3, 4));
// // console.log(sum2(1, 2, 3, 4, 5));
//
// // Function.prototype.myBind = function(context, ...args) {
// //   return (...args2) => this.apply(context, args.concat(args2));
// // };
//
// Function.prototype.myBind = function(context) {
//   let args = Array.from(arguments).slice(1);
//   // let arr = arguments[1];//Array.prototype.slice.call(arguments);
//   // console.log(`arr is ${arr}\n`);
//   let that = this;
//   return function () {
//     // console.log(`arguments is ${arguments}\n`);
//     let combArr = args.concat(Array.from(arguments));
//     // console.log(`combArr is ${combArr}\n`);
//     that.apply(context, combArr);
//   };
// };
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// markov.says.myBind(breakfast, "meow", "Kush")();
//
// markov.says.myBind(breakfast)("meow", "a tree");
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true
//
// //Curry

// function curriedSum (num) {
//   return function (int) {
//     // console.log(this);
//     // console.log(int);
//
//   }.bind(this);
// }
// let f1 = curriedSum(3);
// console.log(f1());

function curriedSum (num) {
  let sum = 0;
  let count = 0;
  // console.log(sum);
  // console.log(count);
  let retFunc =  (int) => {
    sum += int;
    count += 1;
    if (count === num) {
      return sum;
    } else {
      return retFunc;
    }
  };
  return retFunc;
}

Function.prototype.curry = function (num) {
  let that = this;
  let count = 0;
  let args = [];
  let retFunc = function () {
    count += arguments.length;
    args = args.concat(Array.from(arguments));
    if(count >= num) {
      // console.log(args);
      return that(...args);
    }
    return retFunc;
  };
  return retFunc;
};

//
// let f1 = curriedSum(3);
// let h = f1(4)(5);
//
// console.log(h);
// console.log(h(7));

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
let x = sumThree.curry(3)(4)(20)(6); // == 30
console.log(x);
