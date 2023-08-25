// Definir variables
var canvas;
var ctx;
var snake;
var apple;
var squareSize = 10;
var score = 0;

// Inicializar el juego
function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  snake = new Snake();
  apple = new Apple();
  apple.draw();
  snake.draw();
  runGame();
}

// Ejecutar el juego
function runGame() {
  var loop = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apple.draw();
    snake.move();
    snake.draw();
    if (snake.checkCollision()) {
      clearInterval(loop);
      alert("Game Over");
    }
    if (snake.eatApple(apple)) {
      apple = new Apple();
      score++;
    }
    document.getElementById("score").innerHTML = score;
  }, 60);
}

// Definir la serpiente
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = squareSize;
  this.ySpeed = 0;
  this.body = [];

  this.draw = function() {
    ctx.fillStyle = "#FFFFFF";
    for (var i = 0; i < this.body.length; i++) {
      ctx.fillRect(this.body[i].x, this.body[i].y, squareSize, squareSize);
    }
    this.body.push({x: this.x, y: this.y});
    while (this.body.length > score + 1) {
      this.body.shift();
    }
  };

  this.move = function() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x >= canvas.width) {
      this.x = 0;
    }
    else if (this.x < 0) {
      this.x = canvas.width - squareSize;
    }
    if (this.y >= canvas.height) {
      this.y = 0;
    }
    else if (this.y < 0) {
      this.y = canvas.height - squareSize;
    }
  };

  this.changeDirection = function(direction) {
    switch(direction) {
      case "Up":
        this.xSpeed = 0;
        this.ySpeed = -squareSize;
        break;
      case "Down":
        this.xSpeed = 0;
        this.ySpeed = squareSize;
        break;
      case "Left":
        this.xSpeed = -squareSize;
        this.ySpeed = 0;
        break;
      case "Right":
        this.xSpeed = squareSize;
        this.ySpeed = 0;
        break;
    }
  };

  // Checks if the snake has collided with itself.
  this.checkCollision = function() {
    // Loops through the body of the snake, starting with the second element.
    // The first element of the body is the head of the snake, which cannot collide with itself.
    for (var i = 1; i < this.body.length; i++) {
      // If the head of the snake is in the same position as any other part of the snake, return true.
      if (this.x == this.body[i].x && this.y == this.body[i].y) {
        return true;
      }
    }
    // If the head of the snake never collided with any other part of the snake, return false.
    return false;
  };

  this.checkCollision = function() {
    for (var i = 1; i < this.body.length; i++) {
      if (this.x == this.body[i].x && this.y == this.body[i].y) {
        return true;
      }
    }
    return false;
  };

  this.eatApple = function(apple) {
    if (this.x == apple.x && this.y == apple.y) {
      return true;
    }
    return false;
  };
}

// Definir la manzana
function Apple() {
  this.x = Math.floor(Math.random() * canvas.width / squareSize) * squareSize;
  this.y = Math.floor(Math.random() * canvas.height / squareSize) * squareSize;

  this.draw = function() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, squareSize, squareSize);
  };
}

// Manejar las teclas
document.onkeydown = function(event) {
  var direction;
  switch(event.keyCode) {
    case 37:
      direction = "Left";
      break;
    case 38:
      direction = "Up";
      break;
    case 39:
      direction = "Right";
      break;
    case 40:
      direction = "Down";
      break;
  }
  snake.changeDirection(direction);
};

// Inicializar el juego al cargar la página
window.onload = function() {
  init();
};