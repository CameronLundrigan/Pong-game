export default class Ball{
    constructor(ballElem){
        this.ballElem=ballElem
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    setX(value){
        this.ballElem.style.setProperty("--x",value)
    }


    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    setY(value){
        this.ballElem.style.setProperty("--y",value)
    }

    update(delta){
        this.x = 5
        this.y = 15

    }
}