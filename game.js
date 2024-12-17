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
    }, 1000); 
}

function start() {
    firstClick = null;
    secondClick = null;
    lockbutton = false;
}
