"use strict";
var Ball = (function () {
    function Ball(gameInstance) {
        this.gameInstance = gameInstance;
        this.element = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.posX = Math.random() * window.innerWidth - this.element.clientWidth;
        this.posY = Math.random() * window.innerHeight - this.element.clientHeight;
        this.speed = this.gameInstance.globalSpeed;
        if (Math.random() > 0.5) {
            this.speedY = this.speed;
        }
        else {
            this.speedY = this.speed * -1;
        }
        if (Math.random() > 0.5) {
            this.speedX = this.speed;
        }
        else {
            this.speedX = this.speed * -1;
        }
    }
    Ball.prototype.update = function () {
        var _a;
        this.posX += this.speedX;
        this.posY += this.speedY;
        var rightBorder = window.innerWidth - this.element.clientWidth;
        var bottemBorder = window.innerHeight - this.element.clientHeight;
        if (this.posY > bottemBorder || this.posY < 0) {
            this.speedY *= -1;
        }
        if (this.posX < 0 || this.posX > rightBorder) {
            var index = this.gameInstance.balls.indexOf(this);
            this.gameInstance.balls.splice(index, 1);
            this.gameInstance.score--;
            document.getElementsByTagName("score")[0].innerHTML = "Score: " + this.gameInstance.score;
            (_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.element);
        }
        this.element.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    Ball.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Ball;
}());
var Paddle = (function () {
    function Paddle(gameInstance) {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.element = document.createElement("paddle");
        this.gameInstance = gameInstance;
        this.paddleSpeed = 3 * this.gameInstance.globalSpeed;
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.upkey = 87;
        this.downkey = 83;
        this.posX = 0;
        this.posY = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = this.paddleSpeed;
                break;
            case this.downkey:
                this.downSpeed = this.paddleSpeed;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newPosY = this.posY - this.upSpeed + this.downSpeed;
        if (newPosY > 0 && newPosY + 100 < window.innerHeight)
            this.posY = newPosY;
        this.element.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return Paddle;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.ballAmount = 1;
        this.score = 0;
        this.globalSpeed = 1;
        this.paddle = new Paddle(this);
        this.paddle2 = new Paddle2(this);
        for (var i = 0; i < this.ballAmount; i++) {
            this.balls.push(new Ball(this));
        }
        this.gameLoop();
    }
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.paddle.update();
        this.paddle2.update();
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        if (this.ballAmount > this.balls.length) {
            for (var i = 0; i < this.ballAmount - this.balls.length; i++) {
                this.balls.push(new Ball(this));
            }
        }
        for (var i = 0; i < this.balls.length; i++) {
            var hit = this.checkCollision(this.balls[i].getRectangle(), this.paddle.getRectangle());
            var hit2 = this.checkCollision(this.balls[i].getRectangle(), this.paddle2.getRectangle());
            if (hit || hit2) {
                this.balls[i].speedX *= -1.5;
                this.score++;
                document.getElementsByTagName("score")[0].innerHTML = "Score: " + this.score;
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle2 = (function () {
    function Paddle2(gameInstance) {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.element = document.createElement("paddle");
        this.gameInstance = gameInstance;
        this.paddleSpeed = 3 * this.gameInstance.globalSpeed;
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.element);
        this.upkey = 38;
        this.downkey = 40;
        this.posX = window.innerWidth - this.element.clientWidth;
        this.posY = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle2.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    Paddle2.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = this.paddleSpeed;
                break;
            case this.downkey:
                this.downSpeed = this.paddleSpeed;
                break;
        }
    };
    Paddle2.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
        }
    };
    Paddle2.prototype.update = function () {
        var newPosY = this.posY - this.upSpeed + this.downSpeed;
        if (newPosY > 0 && newPosY + 100 < window.innerHeight)
            this.posY = newPosY;
        this.element.style.transform = "translate(" + this.posX + "px, " + this.posY + "px)";
    };
    return Paddle2;
}());
//# sourceMappingURL=main.js.map