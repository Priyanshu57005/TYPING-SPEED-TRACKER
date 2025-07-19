const textToType = document.getElementById('textToType');
const input = document.getElementById('input');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('wpm');
const cpmDisplay = document.getElementById('cpm');
const accuracyDisplay = document.getElementById('accuracy');

let originalText = "";
let timer = 60;
let interval = null;
let started = false;

async function loadNewText() {
    try {
        const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1')
        const data = await res.json();
        originalText = data[0].substring(0, 300);
        textToType.innerHTML = originalText;

        input.value = "";
        timer = 60;
        timeDisplay.innerText = timer;
        wpmDisplay.innerHTML = 0;
        cpmDisplay.innerHTML = 0;
        accuracyDisplay.innerHTML = 0;
        started = false;
        disabled = false;
        clearInterval(interval);
    }
    catch (err){
        console.error("Failed to fetch typing text", err);
        textToType.innerHTML = "Failed to load, please check your internet connection.";
    }
}


function startTimer(){
    interval =setInterval(() => {
        timer--;
        timeDisplay.innerHTML = timer;
        if(timer === 0){
            clearInterval(interval)
            input.dasabled = true;
            calculateFinalScore();
        }
    }, 1000);
}


input.addEventListener('input', () => {
    if(!started) {
        startTimer();
        started = true;
    }

     const typedText = input.value;
    const charsTyped = typedText.length;
    const correctChars = typedText.split('').filter((ch, i) => ch === originalText[i]).length;
    const wordsTyped = typedText.trim().split(/\s+/).length;

    const accuracy = Math.round((correctChars / charsTyped) * 100) || 0;
    const cpm = Math.round(correctChars / minutes);
    const wpm = Math.round((correctChars / 5) / minutes);

    accuracyDisplay.innerText = accuracy;
    cpmDisplay.innerText = cpm;
    wpmDisplay.innerText = wpm;
});

function calculateFinalScore(){
    const typedText = input.value;
    const charsTyped = typedText.length;
    const correctChars = typedText.split('').filter((ch, i) => ch === originalText[i]).length;
    const wpm = Math.round((correctChars / 5));
    const cpm = correctChars;
    const accuracy = Math.round((correctChars / charsTyped) * 100) || 0;

    localStorage.setItem("wpm", wpm);
    localStorage.setItem("cpm", cpm);
    localStorage.setItem("accuracy", accuracy);

    window.location.href = "result.html";
}

window.onload = loadNewText;
