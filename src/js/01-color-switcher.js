
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalId;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(()=>{
        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;
    }, 1000)
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
});




