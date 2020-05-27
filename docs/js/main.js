"use strict";
var Ball = (function () {
    function Ball(gameInstance) {
        this._X = 0;
        this._Y = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this._speedMultiplier = 0;
        this.xSpeedMultiplier = 1.5;
        this.ySpeedMultiplier = 1;
        this.gameInstance = gameInstance;
        this._speedMultiplier = this.gameInstance.globalSpeed;
        this._div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this.spawn();
    }
    Object.defineProperty(Ball.prototype, "div", {
        get: function () { return this._div; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "X", {
        get: function () { return this._X; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "Y", {
        get: function () { return this._Y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "speedMultiplier", {
        get: function () { return this._speedMultiplier; },
        enumerable: false,
        configurable: true
    });
    Ball.prototype.spawn = function () {
        if (Math.random() > 0.5) {
            this.ySpeed = this._speedMultiplier;
        }
        else {
            this.ySpeed = this._speedMultiplier * -1;
        }
        if (Math.random() > 0.5) {
            this.xSpeed = this._speedMultiplier;
        }
        else {
            this.xSpeed = this._speedMultiplier * -1;
        }
        this._X = Math.random() * window.innerWidth - this._div.clientWidth;
        this._Y = Math.random() * window.innerHeight - this._div.clientHeight;
    };
    Ball.prototype.update = function () {
        this._X += this.xSpeed;
        this._Y += this.ySpeed;
        this._div.style.transform = "translate(" + this._X + "px, " + this._Y + "px)";
    };
    Ball.prototype.getRectangle = function () {
        return this._div.getBoundingClientRect();
    };
    Ball.prototype.bounceX = function () {
        this.xSpeed *= -1 * this.xSpeedMultiplier;
    };
    Ball.prototype.bounceY = function () {
        this.ySpeed *= -1 * this.ySpeedMultiplier;
    };
    return Ball;
}());
var Paddle = (function () {
    function Paddle(gameInstance, xStart, yStart, upKey, downkey) {
        var _this = this;
        if (xStart === void 0) { xStart = 0; }
        if (yStart === void 0) { yStart = 200; }
        if (upKey === void 0) { upKey = 87; }
        if (downkey === void 0) { downkey = 83; }
        this._X = 0;
        this._Y = 0;
        this.ySpeed = 0;
        this._speedMultiplier = 10;
        this.gameInstance = gameInstance;
        this._speedMultiplier = this._speedMultiplier * this.gameInstance.globalSpeed;
        this._div = document.createElement("paddle");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this.upkey = upKey;
        this.downkey = downkey;
        this._X = xStart;
        this._Y = yStart;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Object.defineProperty(Paddle.prototype, "div", {
        get: function () { return this._div; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "X", {
        get: function () { return this._X; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "Y", {
        get: function () { return this._Y; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "speedMultiplier", {
        get: function () { return this._speedMultiplier; },
        enumerable: false,
        configurable: true
    });
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.ySpeed = this._speedMultiplier * -1;
                break;
            case this.downkey:
                this.ySpeed = this._speedMultiplier;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.ySpeed = 0;
                break;
            case this.downkey:
                this.ySpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newPosY = this._Y + this.ySpeed;
        if (newPosY > 0 && newPosY + this._div.clientHeight < window.innerHeight)
            this._Y = newPosY;
        this._div.style.transform = "translate(" + this.X + "px, " + this._Y + "px)";
    };
    Paddle.prototype.getRectangle = function () {
        return this._div.getBoundingClientRect();
    };
    return Paddle;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.ballAmount = 3;
        this._globalSpeed = 1;
        this._score = 0;
        this.div = document.createElement("game");
        this.div;
        this.paddle = new Paddle(this);
        this.paddle2 = new Paddle(this, window.innerWidth - this.paddle.div.clientWidth, 500, 38, 40);
        for (var i = 0; i < this.ballAmount; i++) {
            this.balls.push(new Ball(this));
        }
        this.gameLoop();
    }
    Object.defineProperty(Game.prototype, "globalSpeed", {
        get: function () { return this._globalSpeed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "score", {
        get: function () { return this._score; },
        set: function (value) { this._score = value; },
        enumerable: false,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update();
            this.checkPaddleBallCollision(ball);
            this.checkBallBorderCollision(ball);
        }
        this.paddle.update();
        this.paddle2.update();
        this.checkBallAmount();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkPaddleBallCollision = function (ball) {
        var hit = this.checkCollision(ball.getRectangle(), this.paddle.getRectangle());
        var hit2 = this.checkCollision(ball.getRectangle(), this.paddle2.getRectangle());
        if (hit || hit2) {
            ball.bounceX();
            this.updateScore(1);
        }
    };
    Game.prototype.checkBallBorderCollision = function (ball) {
        var _a;
        var rightBorder = window.innerWidth - ball.div.clientWidth;
        var bottemBorder = window.innerHeight - ball.div.clientHeight;
        if (ball.Y > bottemBorder || ball.Y < 0) {
            ball.bounceY();
        }
        if (ball.X < 0 || ball.X > rightBorder) {
            var index = this.balls.indexOf(ball);
            this.balls.splice(index, 1);
            this.updateScore(-1);
            (_a = ball.div.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(ball.div);
        }
    };
    Game.prototype.checkBallAmount = function () {
        if (this.ballAmount > this.balls.length) {
            for (var i = 0; i < this.ballAmount - this.balls.length; i++) {
                this.balls.push(new Ball(this));
            }
        }
    };
    Game.prototype.updateScore = function (addScoreAmount) {
        this._score += addScoreAmount;
        document.getElementsByTagName("score")[0].innerHTML = "Score: " + this._score;
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
//# sourceMappingURL=main.js.map