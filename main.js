// 1초 마다 위치를 바꾸는 10 개의 목표물을 모두 클릭하면 성공하는 게임.
// 1. starts by clicking start button.
// 2. objects, scoreboard, timer are shown on field.
// 3. if all objects are clicked within the given time, cleared
// 4. if cleared, moves on to next stage with more objects to click.
// 5. if failed to click all, fail and restart from the ground.

'use strict';

const KIM_WIDTH = 50;
const KIM_HEIGHT = 31.25;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const scoreBrd = document.querySelector('.scoreBrd');
const levelStatus = document.querySelector('.level');

const popUp = document.querySelector('.popup');
const nextStageBtn = document.querySelector('.popup_next_stage_btn');

let started = false;
let numOfObjects = 10;
let score = 0;
let level = 1;

field.addEventListener('click', onClickField);

startBtn.addEventListener('click', startGame);

nextStageBtn.addEventListener('click', startNextStage);

function startGame() {
    started = !started;
    field.innerHTML = '';
    numOfObjects = 10;
    level = 1;
    addObjects(numOfObjects);
    startTimer();
    hideStartBtn();
    displayScore();
    displayLevel();
    playBackground();
}

function resetGame() {
    started = false;
    field.innerHTML = '';
    score = 0;
    level = 1;
    displayScore();
    displayStartBtn();
    displayFalied();
    lobbyBackground();
}

function startNextStage() {
    score = 0;
    numOfObjects += 3;
    addObjects(numOfObjects);
    level += 1;
    displayLevel();
    startTimer();
    hideStartNextStage();
}

function playBackground() {
    field.style.background = 'url(img/household.jpeg) center/cover'
}

function lobbyBackground() {
    field.style.background = 'url(img/toppng.com-kim-jong-un-smiling-kim-jong-un-live-love-laugh-790x731.png) center/cover'

}

function displayStartNextStage() {
    popUp.style.visibility = 'visible';
}

function hideStartNextStage() {
    popUp.style.visibility = 'hidden';
}

function displayFalied() {
    const failed = document.createElement('p');
    failed.setAttribute('class', 'failed');
    failed.innerText = 'FAILED!';
    failed.style.textAlign = 'center';
    failed.style.margin = '0px';
    failed.style.fontSize = '42px'
    failed.style.color = 'red';
    failed.style.fontWeight = 'bold';
    field.appendChild(failed);
}

function displayLevel() {
    levelStatus.innerText = level;
}


function onClickField(event) {
    if (started === false) {
        return;
    }
    const target = event.target;

    if (target.matches('.kim')) {
        target.remove();
        score++;
        displayScore();
        if (score === numOfObjects) {
            displayStartNextStage();
        }
    } 
}

function displayScore() {
    scoreBrd.innerText = score;
}

function startTimer() {
    let remainingTime = 10;
    displayTimer(remainingTime);
    const timer = setInterval(() => {
        displayTimer(--remainingTime);
        if (remainingTime <= 0) {
            clearInterval(timer);
            resetGame();
        } else if (score === numOfObjects) {
            clearInterval(timer);
            
        }
    }, 1000);
}

function hideStartBtn() {
    startBtn.style.visibility = 'hidden';
}

function displayStartBtn() {
    startBtn.style.visibility = 'visible';
}

function displayTimer(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timer.textContent = `${minutes}:${seconds}`;
}

function addObjects(count) {
    let x1 = 0;
    let y1 = 0;
    let x2 = fieldRect.width - KIM_WIDTH;
    let y2 = fieldRect.height - KIM_HEIGHT;
    for (let i = 0; i < count; i++) {
        const KimJungUn = document.createElement('img');
        KimJungUn.setAttribute('src', 'img/pngegg.png');
        KimJungUn.setAttribute('class', 'kim');
        KimJungUn.setAttribute('id', i);
        const x = randomNum(x1, x2);
        const y = randomNum(y1, y2);
        KimJungUn.style.width = '30px';
        KimJungUn.style.left = `${x}px`;
        KimJungUn.style.top = `${y}px`;
        field.appendChild(KimJungUn);
    }
}

function objectPlacement(count) {
    const changer = setInterval(() => {
        for (let i = 0; i < count; i++) {
            const findKimJungUn = field.querySelector('#1');
            findKimJungUn.style.left = `${x}px`;
            findKimJungUn.style.top = `${y}px`;
        }
    }, 1000);
}

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
