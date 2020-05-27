class Paddle {    
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private _X : number = 0
    private _Y : number = 0

    private downkey : number
    private upkey : number

    // private xSpeed : number = 0
    private ySpeed : number = 0

    private _speedMultiplier : number = 10
    // private xSpeedMultiplier : number = 1
    // private ySpeedMultiplier : number = 1

    // Properties
    public get div(): HTMLElement           { return this._div }

    public get X(): number                  { return this._X }
    public get Y(): number                  { return this._Y }
    public get speedMultiplier(): number    { return this._speedMultiplier }

    // Constructor 
    constructor(gameInstance : Game, 
                xStart : number = 0, 
                yStart : number = 200, 
                upKey : number = 87, 
                downkey : number = 83) {

        this.gameInstance = gameInstance
        this._speedMultiplier = this._speedMultiplier * this.gameInstance.globalSpeed

        this._div = document.createElement("paddle")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this.upkey   = upKey
        this.downkey = downkey

        this._X = xStart
        this._Y = yStart

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }


    // Functions

    // Loop Functions
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.ySpeed = this._speedMultiplier * -1
                break
            case this.downkey:
                this.ySpeed = this._speedMultiplier 
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.ySpeed = 0
                break
            case this.downkey:
                this.ySpeed = 0
                break
        }
    }

    public update() {
        let newPosY = this._Y + this.ySpeed

        if (newPosY > 0 && newPosY + this._div.clientHeight < window.innerHeight) this._Y = newPosY

        this._div.style.transform = `translate(${this.X}px, ${this._Y}px)`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }
}