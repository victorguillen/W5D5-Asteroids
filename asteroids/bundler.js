/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", function() {
	  var c=document.getElementById("game-canvas");
	  var ctx=c.getContext("2d");
	  let newGame = new GameView(ctx);
	  newGame.start();
	  window.newGame = newGame;
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);


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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	let Game = __webpack_require__(2);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);