class Ball {
    // Fields
    private _div : HTMLElement
    private gameInstance : Game

    private _X: number = 0
    private _Y: number = 0

    private xSpeed : number = 0
    private ySpeed : number = 0

    private _speedMultiplier : number = 0
    private xSpeedMultiplier : number = 1.5
    private ySpeedMultiplier : number = 1
    

    // Properties
    public get div(): HTMLElement           { return this._div }

    public get X(): number                  { return this._X }
    public get Y(): number                  { return this._Y }

    public get speedMultiplier(): number    { return this._speedMultiplier }

    // Constructor 
    constructor(gameInstance : Game) {
        this.gameInstance = gameInstance
        this._speedMultiplier = this.gameInstance.globalSpeed

        this._div = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this.spawn()
    }

    
    // Functions

    // Init Functions
    private spawn() {
        if(Math.random() > 0.5) { this.ySpeed = this._speedMultiplier } else { this.ySpeed = this._speedMultiplier * -1 }
        if(Math.random() > 0.5) { this.xSpeed = this._speedMultiplier } else { this.xSpeed = this._speedMultiplier * -1 }

        this._X = Math.random() * window.innerWidth - this._div.clientWidth
        this._Y = Math.random() * window.innerHeight - this._div.clientHeight
    }
    
    // Loop Functions
    public update() : void {
        this._X += this.xSpeed
        this._Y += this.ySpeed

        this._div.style.transform = `translate(${this._X}px, ${this._Y}px)`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public bounceX() {
        this.xSpeed *= -1 * this.xSpeedMultiplier
    }

    public bounceY() {
        this.ySpeed *= -1 * this.ySpeedMultiplier
    }
}