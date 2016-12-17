let Game = require('./game.js');

function MovingObject (args) {
  // let args = Array.from(arguments);
  // console.log(args);
  this.color = args.color;
  this.pos = args.pos;
  this.vel = args.vel;
  this.radius = args.radius;
  this.game = args.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  // console.log(this.pos);
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let sumRad = this.radius + otherObject.radius;
  let x = Math.pow((this.pos[0] - otherObject.pos[0]), 2);
  let y = Math.pow((this.pos[1] - otherObject.pos[1]), 2);
  let distance = Math.sqrt(x + y);
  if(distance < sumRad) {
    return true;
  } else {
    return false;
  }
};

module.exports = MovingObject;
