const playerElement = document.querySelector('.player');
const obstacleElement = document.querySelector('.obstacle');
const scoreElement = document.querySelector('.score-card .score');
const highScoreElement = document.querySelector('.score-card .high-score');
const restartGameElement = document.querySelector('.restart-game');
const gameContainerElement = document.querySelector('.game-container');

const OBSTACLE_SIZES = ['xs', 's', 'm', 'l'];

// Keyboard Controls
function addJumpListener()
{
    document.addEventListener('keydown', event => {
        if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w') { jump(); }
    })
}

let jumping = false;
function jump()
{
    if (jumping) { return; }

    jumping = true;

    playerElement.classList.add('jump');

    setTimeout(() => {
            playerElement.classList.remove('jump');
            jumping = false;
    }, 1200);
}

let collisionInterval;
function monitorCollision()
{
    collisionInterval = setInterval(() => {
        if (isCollision()) {
            checkForHighscore();
            stopGame();
        }
    }, 10)
}

function isCollision()
{
    const playerClientRect = playerElement.getBoundingClientRect();
    const playerL = playerClientRect.left;
    const playerR = playerClientRect.right;
    const playerB = playerClientRect.bottom;

    const obstacleClientRect = obstacleElement.getBoundingClientRect();
    const obstacleL = obstacleClientRect.left;
    const obstacleR = obstacleClientRect.right;
    const obstacleT = obstacleClientRect.top;

    const xCollision = obstacleR > playerL && obstacleL < playerR;
    const yCollision = playerB > obstacleT;

    return xCollision && yCollision;
}

let score = 0;
function setScore(newScore)
{
    scoreElement.innerHTML = score = newScore;
}

let scoreInterval;
function countScore()
{
    scoreInterval = setInterval(() => { setScore(score + 1); }, 100);
}

let highscore = localStorage.getItem('highscore') || 0;
function setHighscore(newScore)
{
    highScoreElement.innerHTML = highscore = newScore;
    localStorage.setItem('highscore', newScore);
}

function checkForHighscore()
{
    if (score > highscore) { setHighscore(score); }
}

function getRandomObstacleSize()
{
    const index = Math.floor(Math.random() * (OBSTACLE_SIZES.length - 1));
    return OBSTACLE_SIZES[index];
}

let changeObsticleInterval;
function randomiseObstable()
{
    changeObsticleInterval = setInterval(() => {
        const obstacleSize = getRandomObstacleSize();
        obstacleElement.className = `obstacle obstacle-${obstacleSize}`;
    }, 3000)
}

function stopGame()
{
    clearInterval(collisionInterval);
    clearInterval(scoreInterval);
    clearInterval(changeObsticleInterval);
    restartGameElement.classList.add('show');
    gameContainerElement.classList.add('stop');
}

function restart() {
    location.reload();
}

function main()
{
    addJumpListener();
    monitorCollision();
    countScore();
    setHighscore(highscore);
    randomiseObstable();
}

main();