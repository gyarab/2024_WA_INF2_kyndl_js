let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let currentPlayer = 1;
const totalPairs = 8;
let scores = { 1: 0, 2: 0 };

function startGame() {
    matchedPairs = 0;
    moves = 0;
    currentPlayer = 1;
    scores = { 1: 0, 2: 0 };
    document.getElementById("playerTurn").textContent = `Na tahu: Hráč ${currentPlayer}`;
    document.getElementById("moves").textContent = `Počet tahů: ${moves}`;
    document.getElementById("score1").textContent = `Hráč 1: 0 bodů`;
    document.getElementById("score2").textContent = `Hráč 2: 0 bodů`;
    createCards();
}

function createCards() {
    const container = document.getElementById("gameContainer");
    container.innerHTML = "";
    const images = [
        "image1.png", "image1.png",
        "image2.png", "image2.png",
        "image3.png", "image3.png",
        "image4.png", "image4.png",
        "image5.png", "image5.png",
        "image6.png", "image6.png",
        "image7.png", "image7.png",
        "image8.png", "image8.png"
    ];
    const shuffledImages = images.sort(() => 0.5 - Math.random());

    shuffledImages.forEach(image => {
        const flipCard = document.createElement("div");
        flipCard.className = "flip-card";
        flipCard.onclick = function() { flipCardHandler(flipCard, image); };

        const flipCardInner = document.createElement("div");
        flipCardInner.className = "flip-card-inner";

        const flipCardFront = document.createElement("div");
        flipCardFront.className = "flip-card-front";
        flipCardFront.innerHTML = `<img src="coldpalmer.jpg" alt="Card" style="width:100px;height:100px;">`;

        const flipCardBack = document.createElement("div");
        flipCardBack.className = "flip-card-back";
        flipCardBack.innerHTML = `<img src="${image}" alt="Card Image" style="width:100px;height:100px;">`;

        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        container.appendChild(flipCard);
    });
}

function flipCardHandler(card, image) {
    if (card.classList.contains("matched") || card.classList.contains("flipped")) return;

    card.querySelector(".flip-card-inner").classList.add("flipped");
    flippedCards.push({ card, image });

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById("moves").textContent = `Počet tahů: ${moves}`;
        
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.image === secondCard.image) {
            setTimeout(() => {
                firstCard.card.classList.add("matched");
                secondCard.card.classList.add("matched");
                matchedPairs++;
                scores[currentPlayer] += 1;
                document.getElementById(`score${currentPlayer}`).textContent = `Hráč ${currentPlayer}: ${scores[currentPlayer]} bodů`;

                if (matchedPairs === totalPairs) {
                    setTimeout(() => alert(`Hra skončila! Hráč 1: ${scores[1]} bodů, Hráč 2: ${scores[2]} bodů`), 500);
                }
                flippedCards = [];
            }, 1000);
        } else {
            setTimeout(() => {
                firstCard.card.querySelector(".flip-card-inner").classList.remove("flipped");
                secondCard.card.querySelector(".flip-card-inner").classList.remove("flipped");
                flippedCards = [];
                switchPlayer();
            }, 1000);
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById("playerTurn").textContent = `Na tahu: Hráč ${currentPlayer}`;
}

document.getElementById("restartButton").addEventListener("click", startGame);

startGame();
