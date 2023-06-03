const startBtn = document.querySelector("#startBtn");
const selectArea = document.querySelector("#selectArea");
const playArea = document.querySelector("#playArea");
const deckCards = document.querySelector("#deckCards");



startBtn.addEventListener("click", () => {
    const deckID = document.querySelector("#selectShow .is_active").id;
    console.log(deckID);

    selectArea.style.display = "none";
    playArea.style.display = "block";

    playInit(deckID);;

});


document.addEventListener("click", (e) => {
    if(e.target.classList.contains("card")) {
        if(e.target.classList.contains("is_selected")) {
            e.target.classList.remove("is_selected");
        } else {
            document.querySelectorAll(".cards").forEach((elem) => {
                elem.classList.remove("is_selected");
            });
            e.target.classList.add("is_selected");
        }

    }
})


const cardDir = "../images/cards_new/";

const decks = {
    "heianKamakura": getHeianKamakuraDeck(),
    "sengoku": [],
    "bakumatsu": [],
}


function playInit(deckID) {
    const playDeck = decks[deckID];

    console.log(playDeck);
    for(let card of playDeck) {
        const image0 = `<div class="card"><img src="${cardDir + card}"></div>`
        deckCards.insertAdjacentHTML("afterbegin", image0);
    }
}



function getHeianKamakuraDeck() {
    const deck = [];
    for(let i = 1; i <= 5; i++) {
        deck.push(`現代_${("00" + i).slice(-2)}.webp`);
    }
    for(let i = 1; i <= 17; i++) {
        deck.push(`平安_${("00" + i).slice(-2)}.webp`);
    }

    return deck;
}