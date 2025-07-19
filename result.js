document.getElementById("wpm").textContent = localStorage.getItem("wpm");
document.getElementById("cpm").textContent = localStorage.getItem("cpm");
document.getElementById("accuracy").textContent = localStorage.getItem("accuracy");

function startAgain(){
    window.location.href = "index.html";
}

function shareResults(){
    const wpm = localStorage.getItem("wpm");
    const cpm = localStorage.getItem("cpm");
    const accuracy = localStorage.getItem("accuracy");
    // const message = '🔥 I just typed at ${wpm} WPM with ${accuracy}% accuracy! Try it yourself at Typing Test🚀';
    // const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.origin + '/index.html')}`;

    const message = `I just score ${wpm} WPM with ${accuracy}% accuracy on a typing test! 🎯 Try it now 👇`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.origin + '/index.html')}`;

    window.open(tweetUrl, "_blank");


    if (navigator.share) {
        navigator.share({
            title: "My Typing Score",
            text: message,
            url: window.location.origin + "/index.html"
        });
    }else{
        navigator.clipboard.writeText(message);
        alert("Result copied to clipboard!");
    }
}

window.onload = () => {
    document.getElementById("wpm").textContent = localStorage.getItem("wpm");
    document.getElementById("cpm").textContent = localStorage.getItem("cpm");
    document.getElementById("accuracy").textContent = localStorage.getItem("accuracy");

    confetti({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6}
    });
};