const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };

// let (no const) para poder cambiarlas desde el panel de configuración
let playerSpeed = 40;
let beyonceSpeed = 1;

window.addEventListener('keydown', (event) => {
    // Si el usuario está usando el panel (sliders), no mover al jugador
    if (event.target.tagName === 'INPUT') return;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
            break;
    }
    // Evita que la página se desplace con las flechas
    if (event.key.startsWith('Arrow')) event.preventDefault();

    // Mantener al jugador dentro del área
    playerPosition.x = Math.max(0, Math.min(gameArea.clientWidth - 50, playerPosition.x));
    playerPosition.y = Math.max(0, Math.min(gameArea.clientHeight - 50, playerPosition.y));

    updatePositions();
});

function moveBeyonce() {
    if (beyoncePosition.x < playerPosition.x) {
        beyoncePosition.x += beyonceSpeed;
    } else if (beyoncePosition.x > playerPosition.x) {
        beyoncePosition.x -= beyonceSpeed;
    }

    if (beyoncePosition.y < playerPosition.y) {
        beyoncePosition.y += beyonceSpeed;
    } else if (beyoncePosition.y > playerPosition.y) {
        beyoncePosition.y -= beyonceSpeed;
    }

    updatePositions();
    checkCollision();
}

function updatePositions() {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
    if (Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
        Math.abs(playerPosition.y - beyoncePosition.y) < 50) {
        alert('¡Beyoncé te atrapó!');

        playerPosition = { x: 100, y: 100 };
        beyoncePosition = { x: 300, y: 300 };
    }
}

function gameLoop() {
    moveBeyonce();
    requestAnimationFrame(gameLoop);
}

// ---------- Panel de configuración ----------
const playerSpeedInput = document.getElementById('player-speed');
const enemySpeedInput = document.getElementById('enemy-speed');
const bgColorInput = document.getElementById('bg-color');
const playerColorInput = document.getElementById('player-color');

playerSpeedInput.addEventListener('input', () => {
    playerSpeed = Number(playerSpeedInput.value);
    document.getElementById('player-speed-value').textContent = playerSpeed;
});

enemySpeedInput.addEventListener('input', () => {
    beyonceSpeed = Number(enemySpeedInput.value);
    document.getElementById('enemy-speed-value').textContent = beyonceSpeed;
});

bgColorInput.addEventListener('input', () => {
    gameArea.style.backgroundColor = bgColorInput.value;
});

playerColorInput.addEventListener('input', () => {
    player.style.backgroundColor = playerColorInput.value;
});

// Al soltar un control, quitarle el foco para que las flechas vuelvan a mover al jugador
[playerSpeedInput, enemySpeedInput, bgColorInput, playerColorInput].forEach((el) => {
    el.addEventListener('change', () => el.blur());
});

updatePositions();
gameLoop();
