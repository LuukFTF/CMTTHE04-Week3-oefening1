class Paddle {    

    private element : HTMLElement
    private gameInstance : Game

    private posX : number
    private posY : number

    private downkey : number
    private upkey : number

    private downSpeed : number = 0
    private upSpeed : number = 0

    private paddleSpeed : number


    constructor(gameInstance : Game) {
        this.element = document.createElement("paddle")

        this.gameInstance = gameInstance

        this.paddleSpeed = 10*this.gameInstance.globalSpeed

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.element)

        this.upkey   = 87
        this.downkey = 83

        this.posX = 0
        this.posY = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        // console.log(e.keyCode)

        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = this.paddleSpeed
                break
            case this.downkey:
                this.downSpeed = this.paddleSpeed
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
        }
    }

    public update() {
        let newPosY = this.posY - this.upSpeed + this.downSpeed

        if (newPosY > 0 && newPosY + 100 < window.innerHeight) this.posY = newPosY

        this.element.style.transform = `translate(${this.posX}px, ${this.posY}px)`
    }
}