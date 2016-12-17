const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

function Asteroid (pos, game) {
  this.COLOR = "purple";
  this.RADIUS = 10;
  MovingObject.call(this, {
    pos: pos,
    game: game,
    color: this.COLOR,
    radius: this.RADIUS,
    vel: this.randomVec(5)
  });
}

Util.inherits(Asteroid, MovingObject);
// Return a randomly oriented vector with the given length.
Asteroid.prototype.randomVec = function(length) {
  const deg = 2 * Math.PI * Math.random();
  return Util.scale([Math.sin(deg), Math.cos(deg)], length);
};

module.exports = Asteroid;
