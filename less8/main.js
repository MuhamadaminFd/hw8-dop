let time = document.getElementById('time');
let count = document.getElementById('count');
let start = document.getElementById('start');
let countPerSecond = document.getElementById('count-per-second');
let countPer = document.getElementById('countPer');
let restart = document.getElementById('restart');
let scoreboard = document.getElementById('scoreboard'); // Элемент для отображения scoreboard

let interval;
let timeout;
let i = 0;
let timeValue = parseInt(time.value);
let totalClicks = 0;
let bestScore = localStorage.getItem('bestScore') || 0; // Получаем лучший результат из localStorage

// Функция для обновления scoreboard
const updateScoreboard = () => {
    scoreboard.textContent = `Best Score: ${bestScore}`;
}

time.onchange = (event) => {
    timeValue = parseInt(event.target.value);
}

start.onclick = () => {
    i++;
    count.textContent = i;
    totalClicks++;
    if (i === 1) {
        timeout = setTimeout(() => {
            start.disabled = true;
            countPerSecond.textContent = (i / timeValue).toFixed(2);
            clearInterval(interval);
            countPer.textContent = totalClicks;

     
            if (totalClicks > bestScore) {
                bestScore = totalClicks;
                localStorage.setItem('bestScore', bestScore); 
                updateScoreboard(); 
            }
        }, timeValue * 1000);
        interval = setInterval(() => {
            if (timeValue > 0) {
                timeValue--;
                time.value = timeValue;
            }
            if (timeValue === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}

restart.onclick = () => {
    start.disabled = false;
    time.value = 5;
    timeValue = 5;
    count.textContent = 0;
    i = 0;
    countPerSecond.textContent = 0;
    clearInterval(interval);
    clearTimeout(timeout);
    totalClicks = 0;
    countPer.textContent = 0;
    updateScoreboard(); 
}


updateScoreboard();
