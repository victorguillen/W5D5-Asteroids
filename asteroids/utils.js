const Util = {
  inherits (childClass, parentClass) {
    function surrogate () { }
    surrogate.prototype = parentClass.prototype;
    childClass.prototype = new surrogate;
    childClass.prototype.constructor = childClass;
  }, 

  // Return a randomly oriented vector with the given length.
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};


module.exports = Util;
