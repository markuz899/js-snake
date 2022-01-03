import { getInputDirection } from "./input.js";

export let SNAKE_SPEED = 10;
const snakeBody = [{ x: 10, y: 11 }];
let newSegment = 0;
let result = 0;

export function update() {
  addSegments();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((seg) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = seg.y;
    snakeEl.style.gridColumnStart = seg.x;
    snakeEl.classList.add("snake");
    gameBoard.appendChild(snakeEl);
  });
}

export function expandSnake(amount) {
  result += 5;
  document.title = result;
  newSegment += amount;

  if (SNAKE_SPEED === 10) {
    if (result > 10) SNAKE_SPEED += 2;
  } else if (SNAKE_SPEED === 12) {
    if (result > 50) SNAKE_SPEED += 2;
  }
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPosition(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

export function equalPosition(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegment = 0;
}
