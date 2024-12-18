const container = document.getElementById("game-container");
const cardValues = [
    "😂", "😂",
    "😇", "😇",
    "🥵", "🥵",
    "😶‍🌫️", "😶‍🌫️",
    "😈", "😈",
    "🤡", "🤡",
    "💩", "💩",
    "💋", "💋"
];

function shuffleCards(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
}

shuffleCards(cardValues);

let firstClick = null;
let secondClick = null;
let lockbutton = false;

cardValues.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");

    const emoji = document.createElement("p");
    emoji.innerText = value;
    emoji.classList.add("unclick"); 

    card.appendChild(emoji);
    container.appendChild(card);

    card.addEventListener("click", clicked);
});

function clicked(event) {
    const flipped = event.target; 
    const emoji = flipped.querySelector("p");

    if (lockbutton || emoji.classList.contains("clicked")) return;

    emoji.classList.add("clicked");
    emoji.classList.remove("unclick");

    if (!firstClick) {
        firstClick = flipped;
    }
    else if (!secondClick) {
        secondClick = flipped;
        lockbutton = true; 
        match(); 
    }
}

function match() {
    const firstEmoji = firstClick.querySelector("p");
    const secondEmoji = secondClick.querySelector("p");

    if (firstEmoji.innerText === secondEmoji.innerText) {
        firstClick.removeEventListener("click", clicked);
        secondClick.removeEventListener("click", clicked);
        start();
    } else {
        check();
    }
}

function check() {
    setTimeout(() => {
        firstClick.querySelector("p").classList.remove("clicked");
        firstClick.querySelector("p").classList.add("unclick");
        
        secondClick.querySelector("p").classList.remove("clicked");
        secondClick.querySelector("p").classList.add("unclick");

        start();
    }, 500); 
}

function start() {
    firstClick = null;
    secondClick = null;
    lockbutton = false;
}
const timer=document.createElement("div");
timer.id="timer"
let labelMin=document.createElement("label")
labelMin.id="minutes"
labelMin.appendChild(document.createTextNode("00"))
let labelSec=document.createElement("label")
labelSec.id="seconds"
labelSec.appendChild(document.createTextNode("00"))
let dots=document.createElement("p")
dots.innerText=":"
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
timer.appendChild(labelMin)
timer.appendChild(dots)
timer.appendChild(labelSec)

container.appendChild(timer)
