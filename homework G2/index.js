'use strict'
let rightRocket = document.getElementById('right_rocket');
// rightRocket.style.backgroundColor = 'red';
let leftRocket = document.getElementById('left_rocket');
let field = document.getElementById('field');
let ball = document.getElementById('ball');
let score = document.getElementById('score');
let scoreLeftField = document.getElementById('scoreLeftField');
let scoreRightField = document.getElementById('scoreRightField');

let scoreLeft = 0;
let scoreRight = 0;

createDefaultStateOfField();
createScore();

window.addEventListener('keydown', startMove);
window.addEventListener('keyup', endMove);

function startMove() {
    if (event.which === 38 && checkTopBorder(rightRocket)) {
        moveUp(rightRocket);
    }
    if (event.which === 87 && checkTopBorder(leftRocket)) {
        moveUp(leftRocket);
    }
    if (event.which === 40 && checkBottomBorder(rightRocket)) {
        moveDown(rightRocket);
    }
    if (event.which === 83 && checkBottomBorder(leftRocket)) {
        moveDown(leftRocket);
    }
}

function endMove() {
    if (event.which === 38 && checkTopBorder(rightRocket)) {
        addMoveUpBraces(rightRocket);
    }
    if (event.which === 87 && checkTopBorder(leftRocket)) {
        addMoveUpBraces(leftRocket);
    }
    if (event.which === 40 && checkBottomBorder(rightRocket)) {
        addMoveDownBraces(rightRocket);
    }
    if (event.which === 83 && checkBottomBorder(leftRocket)) {
        addMoveDownBraces(leftRocket);
    }
}

function moveUp(rocket) {
    rocket.style.transition = '300ms';
    rocket.style.top = rocket.getBoundingClientRect().top - 20 + 'px';
}
function moveDown(rocket) {
    rocket.style.transition = '300ms';
    rocket.style.top = rocket.getBoundingClientRect().top + 20 + 'px';
}
function addMoveUpBraces(rocket) {
    rocket.style.transition = '500ms';
    rocket.style.top = rocket.getBoundingClientRect().top - 10 + 'px';
}
function addMoveDownBraces(rocket) {
    rocket.style.transition = '500ms';
    rocket.style.top = rocket.getBoundingClientRect().top + 10 + 'px';
}

function checkBottomBorder(rocket) {
    if (rocket.getBoundingClientRect().bottom + 20 > field.getBoundingClientRect().bottom) {
        rocket.style.transition = '250ms';
        rocket.style.top = field.getBoundingClientRect().bottom - rocket.offsetHeight + 'px';
        return false;
    }
    else {
        return true;
    }
}
function checkTopBorder(rocket) {
    if (rocket.getBoundingClientRect().top - 20 < field.getBoundingClientRect().top) {
        rocket.style.transition = '250ms';
        rocket.style.top = field.getBoundingClientRect().top + 'px';
        return false;
    }
    else {
        return true;
    }
}

function startGame(event){
    let directions = [getRandomArbitrary(30, 60), getRandomArbitrary(120, 150), getRandomArbitrary(210, 240), getRandomArbitrary(300, 330)];
    let angle = directions[getRandomInt(0, 3)];
    let angleInRad = angle*Math.PI/180;
    let speedX = 6;
    let speedY = 6;
    let timer = setInterval(moveBall, 40);
    event.target.disabled = true;

    function moveBall() {
        ball.style.left = ball.getBoundingClientRect().left + speedX*Math.cos(angleInRad) + 'px';
        ball.style.top = ball.getBoundingClientRect().top + speedY*Math.sin(angleInRad) + 'px';

        // check intersection with bottom border
        if(ball.getBoundingClientRect().bottom >= field.getBoundingClientRect().bottom) {
            speedY *= -1;
        }
        // check intersection with top border
        if(ball.getBoundingClientRect().top <= field.getBoundingClientRect().top) {
            speedY *= -1;
        }
        // check intersection with right rocket
        if (ball.getBoundingClientRect().right >= rightRocket.getBoundingClientRect().left && ball.getBoundingClientRect().top >= rightRocket.getBoundingClientRect().top && ball.getBoundingClientRect().top <= rightRocket.getBoundingClientRect().bottom) {
            speedX *= -1;
        }
        // check intersection with left rocket
        if (ball.getBoundingClientRect().left <= leftRocket.getBoundingClientRect().right && ball.getBoundingClientRect().top >= leftRocket.getBoundingClientRect().top && ball.getBoundingClientRect().top <= leftRocket.getBoundingClientRect().bottom) {
            speedX *= -1;
        }
        // check intersection with right border
        if(ball.getBoundingClientRect().right >= field.getBoundingClientRect().right) {
            finishSmallGame(timer);
            scoreRight++;
            scoreLeftField.textContent = scoreRight;
            event.target.disabled = false;
        }
        // check intersection with left border
        if(ball.getBoundingClientRect().left <= field.getBoundingClientRect().left) {
            finishSmallGame(timer);
            scoreLeft++;
            scoreRightField.textContent = scoreLeft;
            event.target.disabled = false;
        }
        if (scoreLeft === 2) {
            finishSmallGame(timer);
            scoreLeft = 0;
            scoreRight = 0;
            setTimeout(finishGame, 100);
            function finishGame() {
                alert('Right player win!');
                scoreLeftField.textContent = scoreLeft;
                scoreRightField.textContent = scoreRight;
                event.target.disabled = false;
            }
        }
        if (scoreRight === 2) {
            finishSmallGame(timer);
            scoreLeft = 0;
            scoreRight = 0;
            setTimeout(finishGame, 100);
            function finishGame() {
                alert('Left player win!');
                scoreLeftField.textContent = scoreLeft;
                scoreRightField.textContent = scoreRight;
                event.target.disabled = false;
            }
        }
    }
}

function finishSmallGame(timer) {
    createDefaultStateOfField();
    clearInterval(timer);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createDefaultStateOfField() {
    rightRocket.style.top = field.getBoundingClientRect().top + field.getBoundingClientRect().height / 2 - rightRocket.offsetHeight / 2 + 'px';
    rightRocket.style.left = field.getBoundingClientRect().left + field.getBoundingClientRect().width - rightRocket.offsetWidth + 'px';
    leftRocket.style.top = field.getBoundingClientRect().top + field.getBoundingClientRect().height / 2 - leftRocket.offsetHeight / 2 + 'px';
    ball.style.top = field.getBoundingClientRect().top + field.getBoundingClientRect().height/2 - ball.offsetHeight/2 + 'px';
    ball.style.left = field.getBoundingClientRect().left + field.getBoundingClientRect().width/2 - ball.offsetWidth/2 + 'px';
}

function createScore() {
    scoreLeftField.style.padding = scoreRightField.style.padding = '5px';
    scoreLeftField.style.backgroundColor = 'rgb(105, 195, 255)';
    scoreRightField.style.backgroundColor = 'hotpink';
    score.style.backgroundColor = '#f5f5ee';
    score.style.position = 'absolute';
    score.style.display = scoreLeftField.style.display = scoreRightField.style.display = 'inline-block';
    scoreLeftField.textContent = scoreLeft;
    scoreRightField.textContent = scoreRight;
    score.style.fontSize = '28px';
    let span = document.createElement('span');
    span.textContent = ':';
    score.insertBefore(span, score.children[1]);
    score.style.border = '1px solid black';
    score.style.left = field.getBoundingClientRect().left + field.getBoundingClientRect().width/2 - score.getBoundingClientRect().width/2 + 'px';
}