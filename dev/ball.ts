class Ball {
    
    private element : HTMLElement
    private gameInstance : Game

    private posX : number
    private posY : number
    public speedX : number
    public speedY : number
    public speed : number
    
    constructor(gameInstance : Game) {

        this.gameInstance = gameInstance

        this.element = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        this.posX = Math.random() * window.innerWidth - this.element.clientWidth
        this.posY = Math.random() * window.innerHeight - this.element.clientHeight

        this.speed = this.gameInstance.globalSpeed
        
        if(Math.random() > 0.5) {
            this.speedY = this.speed
        } else {
            this.speedY = this.speed * -1 
        }

        if(Math.random() > 0.5) {
            this.speedX = this.speed
        } else {
            this.speedX = this.speed * -1 
        }
    }
    
    public update() : void {
        this.posX += this.speedX
        this.posY += this.speedY


        let rightBorder = window.innerWidth - this.element.clientWidth
        let bottemBorder = window.innerHeight - this.element.clientHeight

        // if(this.posX > rightBorder) {
        //     this.speedX *= -1
        // }
        if(this.posY > bottemBorder || this.posY < 0) {
            this.speedY *= -1
        }

        if(this.posX < 0 || this.posX > rightBorder){
            let index = this.gameInstance.balls.indexOf(this)
            this.gameInstance.balls.splice(index,1)
            this.gameInstance.score--
            document.getElementsByTagName("score")[0].innerHTML = `Score: ${this.gameInstance.score}`
            this.element.parentNode?.removeChild(this.element)
        }

        this.element.style.transform = `translate(${this.posX}px, ${this.posY}px)`

    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }
}