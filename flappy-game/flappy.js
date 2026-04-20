const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Bird
let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

// Pipes
let pipes = [];

// Game loop
function update() {
  // Apply gravity
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // Create pipes
  if (pipes.length === 0 || pipes[pipes.length - 1].x < 250) {
    let topHeight = Math.random() * 300;
    pipes.push({
      x: canvas.width,
      top: topHeight,
      bottom: topHeight + 150,
      width: 50
    });
  }

  // Move pipes
  pipes.forEach(pipe => {
    pipe.x -= 2;
  });

  // Collision detection
  pipes.forEach(pipe => {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      alert("Game Over");
      document.location.reload();
    }
  });

  // Remove off-screen pipes
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Pipes
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height);
  });
}

// Game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Controls
document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
});

// Start game
loop();