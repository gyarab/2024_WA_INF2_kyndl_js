let flippedCards = [];
let matchedPairs = 0;

function createCards() {
    const container = document.getElementById("cardContainer");
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
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.image === secondCard.image) {
          setTimeout(() => {
              firstCard.card.classList.add("matched");
              secondCard.card.classList.add("matched");
              matchedPairs++;

              if (matchedPairs === 8) {
                  setTimeout(() => alert("Congratulations! You won!"), 500);
              }
              flippedCards = []; 
          }, 1000);
          
      } else {
          setTimeout(() => {
              firstCard.card.querySelector(".flip-card-inner").classList.remove("flipped");
              secondCard.card.querySelector(".flip-card-inner").classList.remove("flipped");
              flippedCards = [];
          }, 1000);
      }
  }
}