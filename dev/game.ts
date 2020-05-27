/// <reference path="ball.ts"/>
/// <reference path="paddle.ts"/>

class Game {
    // Fields
    private div : HTMLElement

    private balls : Ball[] = []
    private paddle : Paddle
    private paddle2 : Paddle

    private ballAmount : number = 3
    private _globalSpeed: number = 1
    private _score: number = 0

    // Properties
    public get globalSpeed(): number    { return this._globalSpeed }
    public get score(): number          { return this._score }
    public set score(value: number)     { this._score = value }

    // Constructor 
    constructor() {
        this.div = document.createElement("game")
        this.div

        this.paddle = new Paddle(this)
        this.paddle2 = new Paddle(this, window.innerWidth - this.paddle.div.clientWidth, 500, 38, 40)

        for (let i = 0; i < this.ballAmount; i++) {
            this.balls.push(new Ball(this))         
        }

        this.gameLoop()
    }
    

    // Functions
        
    //gameLoop
    private gameLoop(){
        for (let ball of this.balls) {
            ball.update()
            this.checkPaddleBallCollision(ball)
            this.checkBallBorderCollision(ball)
            
        }

        this.paddle.update()
        this.paddle2.update()

        this.checkBallAmount()

        requestAnimationFrame(()=>this.gameLoop())
    }

    // Loop Functions
    private checkPaddleBallCollision(ball : Ball) {
        let hit = this.checkCollision(ball.getRectangle(), this.paddle.getRectangle())
        let hit2 = this.checkCollision(ball.getRectangle(), this.paddle2.getRectangle())

        if (hit || hit2) {
            ball.bounceX()
            this.updateScore(1)
        }
    }

    private checkBallBorderCollision(ball : Ball) {
        let rightBorder = window.innerWidth - ball.div.clientWidth
        let bottemBorder = window.innerHeight - ball.div.clientHeight

        if(ball.Y > bottemBorder || ball.Y < 0) {
            ball.bounceY()
        }

        if(ball.X < 0 || ball.X > rightBorder){
            let index = this.balls.indexOf(ball)
            this.balls.splice(index,1)
            this.updateScore(-1)
            ball.div.parentNode?.removeChild(ball.div)
        }
    }

    private checkBallAmount() {
        if(this.ballAmount > this.balls.length) {
            for (let i = 0; i < this.ballAmount - this.balls.length; i++) {    
                this.balls.push(new Ball(this))
            }
        }
    }

    private updateScore(addScoreAmount: number) {
        this._score += addScoreAmount
        document.getElementsByTagName("score")[0].innerHTML = `Score: ${this._score}`
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
} 

window.addEventListener("load", () => new Game())