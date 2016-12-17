const Game = require('./game.js');

function GameView (ctx) {
  this.Game = new Game(800, 800, 10);
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval(() => {
    this.Game.step();
    this.Game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;
