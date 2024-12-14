// script.js
let studyTime = 25 * 60; // 25分（秒単位）
let breakTime = 5 * 60; // 5分（休憩時間）
let timeRemaining = studyTime;
let level = 1;
let popcornCount = 0;
let isRunning = false;

const timeDisplay = document.getElementById('time');
const popcornDisplay = document.getElementById('popcorn-count');
const levelDisplay = document.getElementById('level');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeDisplay.textContent = `残り時間: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    popcornDisplay.textContent = `ポップコーン: ${popcornCount} 粒`;
    levelDisplay.textContent = `レベル: ${level}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    fetch('/start')
        .then(response => response.json())
        .then(data => {
            timeRemaining = data.time;
            popcornCount = data.popcorn_count;
            updateDisplay();
        });
}

function resetTimer() {
    fetch('/reset')
        .then(response => response.json())
        .then(data => {
            timeRemaining = data.time;
            popcornCount = data.popcorn_count;
            level = data.level;
            updateDisplay();
        });
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
