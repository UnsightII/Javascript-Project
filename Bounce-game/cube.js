const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext("2d");
const resetBtn = document.querySelector('#resetBtn');

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

let running = true;

// physics
const gravity = 0.5;
const jumpPower = -10;
const groundY = 350;

let speed = 2;
let startingX = 500;

let cube;
let spikes = [];

/* ---------------- INIT ---------------- */

function initGame() {
    cube = {
        x: 50,
        y: 200,
        width: 25,
        height: 25,
        velocityY: 0,
        onGround: true
    };

    spikes = [];
    createSpikes();

    running = true;
}

/* ---------------- GAME LOOP ---------------- */

function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

/* ---------------- UPDATE ---------------- */

function update() {
    if (!running) return;

    // gravity
    cube.velocityY += gravity;
    cube.y += cube.velocityY;

    if (cube.y + cube.height >= groundY) {
        cube.y = groundY - cube.height;
        cube.velocityY = 0;
        cube.onGround = true;
    }

    // move spikes
    for (let i = 0; i < spikes.length; i++) {
        let spike = spikes[i];

        spike.x -= speed;

        // reset spike
        if (spike.x < -spike.width) {
            spike.x = startingX + Math.random() * 200;
        }

        // collision
        if (
            cube.x < spike.x + spike.width &&
            cube.x + cube.width > spike.x &&
            cube.y < spike.y + spike.height &&
            cube.y + cube.height > spike.y
        ) {
            running = false;
        }
    }
}

/* ---------------- DRAW ---------------- */

function draw() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    // ground
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(gameWidth, groundY);
    ctx.stroke();

    // spikes
    for (let i = 0; i < spikes.length; i++) {
        drawSpike(spikes[i]);
    }

    // cube
    drawCube();

    // game over screen
    if (!running) {
        ctx.font = "50px MV Boli";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    }
}

/* ---------------- DRAW FUNCTIONS ---------------- */

function drawCube() {
    ctx.fillStyle = "red";
    ctx.fillRect(cube.x, cube.y, cube.width, cube.height);
}

function drawSpike(spike) {
    ctx.fillStyle = "black";
    ctx.fillRect(spike.x, spike.y, spike.width, spike.height);
}

/* ---------------- INPUT ---------------- */

window.addEventListener('keydown', (event) => {
    if (event.code === "Space" && cube.onGround && running) {
        jump();
    }
});

function jump() {
    cube.velocityY = jumpPower;
    cube.onGround = false;
}

/* ---------------- SPIKES ---------------- */

function createSpikes() {
    for (let i = 0; i < 3; i++) {
        spikes.push({
            x: startingX + (i * 200),
            y: groundY - 25,
            width: 25,
            height: 25
        });
    }
}

/* ---------------- RESET ---------------- */

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    initGame();
}

/* ---------------- START ---------------- */

initGame();
gameLoop();