'use strict'

const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const replayBtn = document.querySelector('.replayBtn');
const replayBox = document.querySelector('.replay');
const field = document.querySelector('.field');
const fieldRight = field.getBoundingClientRect().right;
const fieldBottom = field.getBoundingClientRect().bottom;
const fieldLeft = field.getBoundingClientRect().left;
const fieldTop = field.getBoundingClientRect().top;

function createRandomItems() {
    for (let i=0; i < 10; i++){
        const carrot = document.createElement('img');
        carrot.setAttribute('class', 'item carrot');
        carrot.setAttribute('src', 'img/carrot.png');
        
        let randomX = getRandomNumber(fieldLeft, fieldRight);
        let randomY = getRandomNumber(fieldTop, fieldBottom);

        carrot.style.top = `${randomY}px`
        carrot.style.left = `${randomX}px`

        field.appendChild(carrot);
    }

    for(let i=0; i < 8; i++){
        const bug = document.createElement('img');
        bug.setAttribute('class', 'item bug');
        bug.setAttribute('src', 'img/bug.png');

        let randomX = getRandomNumber(fieldLeft, fieldRight);
        let randomY = getRandomNumber(fieldTop, fieldBottom);

        bug.style.top = `${randomY}px`
        bug.style.left = `${randomX}px`

        field.appendChild(bug);
    }
}

function getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
}


startBtn.addEventListener('click', () => {
    createRandomItems();
    startBtn.remove();
    stopBtn.style.display = 'inline';
})

stopBtn.addEventListener('click', () => {
    replayBox.style.display = 'flex';
})

replayBtn.addEventListener('click', () => {
    field.innerHTML = '';
    replayBox.style.display = 'none';
    createRandomItems();
})