const Asteroid = require('./asteroid.js');


function Game (dim_x, dim_y, num_asteroids) {
  this.DIM_X = dim_x;
  this.DIM_Y = dim_y;
  this.NUM_ASTEROIDS = num_asteroids;

  this.asteroids = this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  let asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    asteroids.push(new Asteroid(this.randomPosition(), this));
  }
    return asteroids;
};

Game.prototype.randomPosition = function() {
  return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  for (var i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].move();
  }
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] % this.DIM_X;
  pos[1] = pos[1] % this.DIM_Y;
};

Game.prototype.checkCollisions = () => {
  for (var i = 0; i < this.asteroids.length - 1; i++) {
    for (var j = i + 1; j < this.asteroids.length; j++) {
      if (asteroids[i].isCollidedWith(asteroids[j])) {
        alert('Collision');
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
