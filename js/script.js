import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const gameOverOverlay = document.getElementById("game-over-overlay");
const gameOverMessage = document.getElementById("game-over-message");
const playAgainButton = document.getElementById("restart-button");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const scoreBoard=document.getElementById("score");

startScreen.style.display= "block";
elements.style.display = "none";
gameOverOverlay.style.display = "none";
playAgainButton.style.display = "none";
score.style.display = "none";

let gameRunning = false;
let lastTime; 
startButton.addEventListener("click", startGame);

function startGame() {
  startScreen.style.display = "none"; // Hide the start screen
  gameRunning = true; // Start the game
  resetGame(); // Reset game state

  // Show the game elements
  elements.style.display = "block";
  gameOverOverlay.style.display = "block";
  playAgainButton.style.display = "none";
  scoreBoard.style.display = "flex";
  window.requestAnimationFrame(update); // Start the animation loop
}

function resetGame() {
  playerScoreElem.textContent = "0";
  computerScoreElem.textContent = "0";
  ball.reset();
  computerPaddle.reset();
}

function update(time) {
  if (gameRunning) {
    const delta = time - (lastTime || 0);
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  if (gameRunning) {
    window.requestAnimationFrame(update);
  }
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }

  // Check for win condition (score of 5)
  if (
    parseInt(playerScoreElem.textContent) >= 5 ||
    parseInt(computerScoreElem.textContent) >= 5
  ) {
    gameRunning = false; // Stop the game
    gameOverOverlay.style.display = "block"; // Show the overlay
    playAgainButton.style.display = "block";

    // Update the game over message
    const winnerMessage =
      parseInt(playerScoreElem.textContent) >= 5 ? "You Won!" : "You Lost!";
    gameOverMessage.textContent = winnerMessage;
  } else {
    ball.reset();
    computerPaddle.reset();
  }
}

function playAgain() {
  // Reset scores and hide the game over overlay
  playerScoreElem.textContent = "0";
  computerScoreElem.textContent = "0";
  gameOverOverlay.style.display = "none";
  playAgainButton.style.display = "none";

  // Reset game state
  gameRunning = true;

  // Restart the animation loop
  window.requestAnimationFrame(update);
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

playAgainButton.addEventListener("click", playAgain);

window.requestAnimationFrame(update);
