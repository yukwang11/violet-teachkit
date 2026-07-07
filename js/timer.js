const secondsModeBtn = document.getElementById("secondsMode");
const minutesModeBtn = document.getElementById("minutesMode");

const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const secondsInputBox = document.getElementById("secondsInputBox");

const timerDisplay = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetBtn = document.getElementById("resetTimer");

let totalSeconds = 300;
let remainingSeconds = 300;
let timerInterval = null;
let showSeconds = true;

function formatTime(seconds) {
    if (showSeconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
    }

    const minsOnly = Math.ceil(seconds / 60);
    return minsOnly + " min";
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds);
}

function getInputTime() {
    const mins = Number(minutesInput.value) || 0;
    const secs = showSeconds ? Number(secondsInput.value) || 0 : 0;

    totalSeconds = mins * 60 + secs;
    remainingSeconds = totalSeconds;

    updateDisplay();
}

function startTimer() {
    if (timerInterval || remainingSeconds <= 0) return;

    timerInterval = setInterval(() => {
        remainingSeconds--;

        updateDisplay();

        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerDisplay.textContent = "Time's up!";
            timerDisplay.classList.add("time-up");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    timerDisplay.classList.remove("time-up");
    getInputTime();
}

function setRunningState(running) {
    if (running) {
        startBtn.classList.add("running");
    } else {
        startBtn.classList.remove("running");
    }
}

secondsModeBtn.addEventListener("click", () => {
    showSeconds = true;

    secondsModeBtn.classList.add("active");
    minutesModeBtn.classList.remove("active");

    secondsInputBox.style.display = "block";

    resetTimer();
});

minutesModeBtn.addEventListener("click", () => {
    showSeconds = false;

    minutesModeBtn.classList.add("active");
    secondsModeBtn.classList.remove("active");

    secondsInputBox.style.display = "none";

    resetTimer();
});

minutesInput.addEventListener("input", getInputTime);
secondsInput.addEventListener("input", getInputTime);

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

getInputTime();
