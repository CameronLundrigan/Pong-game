import Ball from './Ball.js'

const ball= new Ball(document.getElementById("ball"));

let lastTime;

function update(time) {
    if (lastTime !== undefined) {
        const delta = time - lastTime;
        ball.update(delta);
        console.log('Ball position:', ball.x, ball.y);
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}




// Start the animation loop
window.requestAnimationFrame(update);
