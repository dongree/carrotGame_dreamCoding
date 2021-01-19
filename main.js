'use strict'

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const replayBtn = document.querySelector('.replayBtn');
const replayBox = document.querySelector('.replay');
const replayText = document.querySelector('.replayText');
const field = document.querySelector('.field');
const counter = document.querySelector('.counter');
const timer = document.querySelector('.timer');
let time = null;

const carrotsNum = 30;
const bugsNum = 20;
const timeLimit = 20;

// Sound
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bg = new Audio('sound/bg.mp3');
const game_win = new Audio('sound/game_win.mp3');
const alert = new Audio('sound/alert.wav');

function createRandomItems(num, name) {
    const fieldRight = field.getBoundingClientRect().right;
    const fieldBottom = field.getBoundingClientRect().bottom;
    const fieldLeft = field.getBoundingClientRect().left;
    const fieldTop = field.getBoundingClientRect().top;

    for (let i=0; i < num; i++){
        const item = document.createElement('img');
        item.setAttribute('class', `item ${name}`);
        item.setAttribute('src', `img/${name}.png`);
        
        let randomX = getRandomNumber(fieldLeft, fieldRight);
        let randomY = getRandomNumber(fieldTop, fieldBottom);

        item.style.top = `${randomY}px`
        item.style.left = `${randomX}px`

        field.appendChild(item);
    }
}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
}

function showReplay(text) {
    replayBox.style.display = 'flex';
    replayText.textContent = text;
    clearInterval(time);
}

function timeout() {
    time = setInterval( () => {
        timer.innerHTML -= 1;
        if(timer.textContent == '0'){
            showReplay('Time Out!')
            alert.play();
            bg.pause();
        }
    }, 1000)
}

startBtn.addEventListener('click', () => {
    bg.play();
    createRandomItems(carrotsNum, 'carrot');
    createRandomItems(bugsNum, 'bug');
    startBtn.remove();
    stopBtn.style.display = 'inline';
    counter.innerHTML = carrotsNum;
    timer.innerHTML = timeLimit;
    timeout()
})

stopBtn.addEventListener('click', () => {
    showReplay('Replay?')
    alert.play();
    bg.pause();
})

replayBtn.addEventListener('click', () => {
    field.innerHTML = '';
    replayBox.style.display = 'none';
    createRandomItems(carrotsNum, 'carrot');
    createRandomItems(bugsNum, 'bug');
    counter.innerHTML = carrotsNum;
    timer.innerHTML = timeLimit;
    timeout();
    bg.play();
})

field.addEventListener('click', (e) => {
    const target = e.target;
    const name = target.className;
    if(name === 'item carrot'){
        carrotSound.play();
        target.remove();
        counter.innerHTML = counter.innerHTML-1;
        if(counter.textContent === '0'){
            showReplay('You Win');
            bg.pause();
            game_win.play();
        }
    } else if (name === 'item bug'){
        bugSound.play();
        bg.pause();
        showReplay('You lose')
    }
})