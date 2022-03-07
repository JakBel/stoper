const qs = (e) => document.querySelector(e);

const startBtn = qs(".start");
const pauseBtn = qs(".pause");
const stopBtn = qs(".stop");
const resetBtn = qs(".reset");
const historyBtn = qs(".history");
const stopwatch = qs(".stopwatch");
const time = qs(".time");
const timeList = qs(".time-list");

const infoBtn = qs(".fa-question");
const modalShadow = qs(".modal-shadow");
const closeBtn = qs(".close");

const colorBtn = qs(".fa-paint-brush");
const colorPanel = qs(".colors");
const colorOne = qs(".one");
const colorTwo = qs(".two");
const colorThree = qs(".three");
let root = document.documentElement;

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

//function
const handleStart = () => {
    clearInterval(countTime);
    startBtn.disabled = true;
    startBtn.classList.add("disabled");

    countTime = setInterval(() => {
        if (seconds < 9) {
            seconds++;
            stopwatch.textContent = `${minutes}:0${seconds}`;
        } else if (seconds >= 9 && seconds < 59) {
            seconds++;
            stopwatch.textContent = `${minutes}:${seconds}`;
        } else {
            minutes++;
            seconds = 0;
            stopwatch.textContent = `${minutes}:00`;
        }
    }, 1000);
};

const handleStop = () => {
    time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;

    if (stopwatch.textContent !== "0:00") {
        time.style.visibility = "visible";
        timesArr.push(stopwatch.textContent);
    } else {
        time.style.visibility = "hidden";
    }

    clearStuff();
};

const handlePause = () => {
    clearInterval(countTime);
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");
};

const handleReset = () => {
    clearStuff();
    time.style.visibility = "hidden";
    timesArr = [];
};

const clearStuff = () => {
    clearInterval(countTime);
    stopwatch.textContent = "0:00";
    timeList.textContent = "";
    seconds = 0;
    minutes = 0;
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");
};

const showHistory = () => {
    timeList.textContent = "";
    let num = 1;

    timesArr.forEach((time) => {
        const newTime = document.createElement("li");
        newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`;

        timeList.append(newTime);
        num++;
    });
};

const showModal = () => {
    if (!(modalShadow.style.display === "block")) {
        modalShadow.style.display = "block";
    } else {
        modalShadow.style.display = "none";
    }

    modalShadow.classList.toggle("modal-animation");
};

//addEventListener
startBtn.addEventListener("click", handleStart);
pauseBtn.addEventListener("click", handlePause);
stopBtn.addEventListener("click", handleStop);
resetBtn.addEventListener("click", handleReset);
historyBtn.addEventListener("click", showHistory);

infoBtn.addEventListener("click", showModal);
closeBtn.addEventListener("click", showModal);
window.addEventListener("click", (e) =>
    e.target === modalShadow ? showModal() : false
);

colorBtn.addEventListener('click', () => {
    colorPanel.classList.toggle('show-colors')
})

colorOne.addEventListener("click", () => {
    root.style.setProperty("--first-color", "#fa1406");
    root.style.setProperty("--hover-color", "#a30a01");
});
colorTwo.addEventListener("click", () => {
    root.style.setProperty("--first-color", "#06fa80");
    root.style.setProperty("--hover-color", "#05ac58");
});
colorThree.addEventListener("click", () => {
    root.style.setProperty("--first-color", "#8123fc");
    root.style.setProperty("--hover-color", "#5c1ab3");
});
