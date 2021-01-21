'use strict'

// Ellie's code
const CARROT_SIZE = 80;
const CARROT_COUNT = 30;
const BUG_COUNT = 25;
const GAME_DURATION_SEC = 20;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const winSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
})

popUpRefresh.addEventListener('click', ()=>{
    startGame();
    hidePopUp();
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer()
    hideGameButton();
    showPopUpWithText('REPLAY?')
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playSound(winSound);
    }else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win ? 'You Win' : 'You Lose');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval( () => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png')
}

function onFieldClick(event) {
    if(!started) { // field의 당근, 벌레 버튼 클릭 못하게 함
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        target.remove();
        score++
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        } 
    }
    else if (target.matches('.bug')){
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0; // -< sound 처음(0초)으로 다시 설정
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i=0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = getRandomNumber(x1, x2);
        const y = getRandomNumber(y1, y2);

        item.style.top = `${y}px`
        item.style.left = `${x}px`

        field.appendChild(item);
    }
}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
}


// My code

// const startBtn = document.querySelector('.startBtn');
// const stopBtn = document.querySelector('.stopBtn');
// const replayBtn = document.querySelector('.replayBtn');
// const replayBox = document.querySelector('.replay');
// const replayText = document.querySelector('.replayText');
// const field = document.querySelector('.field');
// const counter = document.querySelector('.counter');
// const timer = document.querySelector('.timer');
// let time = null;

// const carrotsNum = 30;
// const bugsNum = 20;
// const timeLimit = 20;

// // Sound
// const carrotSound = new Audio('sound/carrot_pull.mp3');
// const bugSound = new Audio('sound/bug_pull.mp3');
// const bg = new Audio('sound/bg.mp3');
// const game_win = new Audio('sound/game_win.mp3');
// const alert = new Audio('sound/alert.wav');

// function createRandomItems(num, name) {
//     const fieldRight = field.getBoundingClientRect().right;
//     const fieldBottom = field.getBoundingClientRect().bottom;
//     const fieldLeft = field.getBoundingClientRect().left;
//     const fieldTop = field.getBoundingClientRect().top;

//     for (let i=0; i < num; i++){
//         const item = document.createElement('img');
//         item.setAttribute('class', `item ${name}`);
//         item.setAttribute('src', `img/${name}.png`);
        
//         let randomX = getRandomNumber(fieldLeft, fieldRight);
//         let randomY = getRandomNumber(fieldTop, fieldBottom);

//         item.style.top = `${randomY}px`
//         item.style.left = `${randomX}px`

//         field.appendChild(item);
//     }
// }

// function getRandomNumber(min, max){
//     return Math.random() * (max - min) + min;
// }

// function showReplay(text) {
//     replayBox.style.display = 'flex';
//     replayText.textContent = text;
//     clearInterval(time);
// }

// function timeout() {
//     time = setInterval( () => {
//         timer.innerHTML -= 1;
//         if(timer.textContent == '0'){
//             showReplay('Time Out!')
//             alert.play();
//             bg.pause();
//         }
//     }, 1000)
// }

// startBtn.addEventListener('click', () => {
//     bg.play();
//     createRandomItems(carrotsNum, 'carrot');
//     createRandomItems(bugsNum, 'bug');
//     startBtn.remove();
//     stopBtn.style.display = 'inline';
//     counter.innerHTML = carrotsNum;
//     timer.innerHTML = timeLimit;
//     timeout()
// })

// stopBtn.addEventListener('click', () => {
//     showReplay('Replay?')
//     alert.play();
//     bg.pause();
// })

// replayBtn.addEventListener('click', () => {
//     field.innerHTML = '';
//     replayBox.style.display = 'none';
//     createRandomItems(carrotsNum, 'carrot');
//     createRandomItems(bugsNum, 'bug');
//     counter.innerHTML = carrotsNum;
//     timer.innerHTML = timeLimit;
//     timeout();
//     bg.play();
// })

// field.addEventListener('click', (e) => {
//     const target = e.target;
//     const name = target.className;
//     if(name === 'item carrot'){
//         carrotSound.play();
//         target.remove();
//         counter.innerHTML = counter.innerHTML-1;
//         if(counter.textContent === '0'){
//             showReplay('You Win');
//             bg.pause();
//             game_win.play();
//         }
//     } else if (name === 'item bug'){
//         bugSound.play();
//         bg.pause();
//         showReplay('You lose')
//     }
// })