Function.prototype.inherits = function(parent) {
  let surrogate = function() {};
  surrogate.prototype = parent.prototype;
  this.prototype = new surrogate();
  this.prototype.constructor = this;
};


function Parent(name) {
  this.name = name;
  this.speak = function () { console.log("hello"); };
}

function Child(name) {
  Parent.call(this, name);

  this.cry = function() {
    console.log("Wahhhh!");
  };
}

Child.inherits(Parent);

let testParent = new Parent("Kyle");
let testChild = new Child("Stan");
console.log(testChild.name);
testChild.cry();
// testParent.cry();
testChild.speak();
