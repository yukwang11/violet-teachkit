const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const createWheelBtn = document.getElementById("createWheel");
const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const spinAgainBtn = document.getElementById("spinAgainBtn");

const resultBox = document.getElementById("resultBox");
const result = document.getElementById("result");
const confettiContainer = document.getElementById("confettiContainer");

const radius = canvas.width / 2;

let items = [];
let currentRotation = 0;
let isSpinning = false;

const colors = [
    "#ff3b70",
    "#ff8c1a",
    "#ffd21f",
    "#64d947",
    "#24bfb6",
    "#3d8df5",
    "#884eea",
    "#d93cc7"
];

function getItems() {
    const input = document.getElementById("itemsInput").value;

    items = input
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");
}

function drawWheel() {
    getItems();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (items.length === 0) return;

    const angle = (2 * Math.PI) / items.length;

    for (let i = 0; i < items.length; i++) {
        const start = i * angle;
        const end = start + angle;

        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, start, end);
        ctx.closePath();

        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(start + angle / 2);

        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 28px Arial";
        ctx.shadowColor = "rgba(0,0,0,0.18)";
        ctx.shadowBlur = 4;

        ctx.fillText(items[i], radius - 45, 10);

        ctx.restore();
    }
}

function spinWheel() {
    if (isSpinning || items.length === 0) return;

    isSpinning = true;
    resultBox.classList.add("hidden");
    result.textContent = "";

    const anglePerSlice = 360 / items.length;
    const randomIndex = Math.floor(Math.random() * items.length);

    const sliceCenterAngle =
        randomIndex * anglePerSlice + anglePerSlice / 2;

    const pointerAngle = 270;

    const currentAngle = currentRotation % 360;

    const neededRotation =
        (pointerAngle - sliceCenterAngle - currentAngle + 360) % 360;

    const extraRotation = 360 * 6;

    currentRotation += extraRotation + neededRotation;

    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        result.textContent = items[randomIndex];
        resultBox.classList.remove("hidden");

        launchConfetti();

        isSpinning = false;
    }, 5000);
}

function resetWheel() {
    currentRotation = 0;
    canvas.style.transform = "rotate(0deg)";
    resultBox.classList.add("hidden");
    result.textContent = "";
    drawWheel();
}

function launchConfetti() {
    confettiContainer.innerHTML = "";

    const confettiColors = [
        "#ff3b70",
        "#ffca3a",
        "#64d947",
        "#3d8df5",
        "#884eea",
        "#ff8c1a",
        "#24bfb6"
    ];

    for (let i = 0; i < 130; i++) {
        const piece = document.createElement("div");

        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.backgroundColor =
            confettiColors[Math.floor(Math.random() * confettiColors.length)];

        piece.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
        piece.style.animationDelay = Math.random() * 0.4 + "s";

        piece.style.width = 6 + Math.random() * 8 + "px";
        piece.style.height = 8 + Math.random() * 16 + "px";

        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

        confettiContainer.appendChild(piece);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = "";
    }, 5500);
}

createWheelBtn.addEventListener("click", () => {
    resultBox.classList.add("hidden");
    drawWheel();
});

spinBtn.addEventListener("click", spinWheel);
spinAgainBtn.addEventListener("click", spinWheel);
resetBtn.addEventListener("click", resetWheel);

drawWheel();