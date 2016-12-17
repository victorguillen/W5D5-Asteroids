let GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function() {
  var c=document.getElementById("game-canvas");
  var ctx=c.getContext("2d");
  let newGame = new GameView(ctx);
  newGame.start();
  window.newGame = newGame;
});
