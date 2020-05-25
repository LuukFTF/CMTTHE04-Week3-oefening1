/// <reference path="ball.ts"/>
/// <reference path="paddle.ts"/>

class Game {
    
    public paddle : Paddle
    public paddle2 : Paddle2
    public balls : Ball[] = []

    private ballAmount : number = 3

    public score : number = 0
    
    public globalSpeed : number = 1

    constructor() {
        this.paddle = new Paddle(this)
        this.paddle2 = new Paddle2(this)

        for (let i = 0; i < this.ballAmount; i++) {
            this.balls.push(new Ball(this))         
        }

        this.gameLoop()
    }
    
    checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
        }
        

    private gameLoop(){
        this.paddle.update()
        this.paddle2.update()

        for(let b of this.balls){
            b.update()
        }

        if(this.ballAmount > this.balls.length) {
            for (let i = 0; i < this.ballAmount - this.balls.length; i++) {    
                this.balls.push(new Ball(this))
            }
        }

        for (let i = 0; i < this.balls.length; i++) {
            let hit = this.checkCollision(this.balls[i].getRectangle(), this.paddle.getRectangle())
            let hit2 = this.checkCollision(this.balls[i].getRectangle(), this.paddle2.getRectangle())

            if (hit || hit2) {
                this.balls[i].speedX *= -1.5
                this.score++
                document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.score}`
            }

        }


        requestAnimationFrame(()=>this.gameLoop())
    }

} 

window.addEventListener("load", () => new Game())