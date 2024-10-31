function createCards() {
    const container = document.getElementById("cardContainer");
    for (let i = 1; i <= 16; i++) {
      const flipCard = document.createElement("div");
      flipCard.className = "flip-card";
      flipCard.onclick = function() {
        this.querySelector(".flip-card-inner").classList.toggle("flipped");
      };
  
      const flipCardInner = document.createElement("div");
      flipCardInner.className = "flip-card-inner";
  
      const flipCardFront = document.createElement("div");
      flipCardFront.className = "flip-card-front";
      flipCardFront.innerHTML = `<img src="coldpalmer.jpg" alt="Avatar" style="width:100px;height:100px;">`;
  
      const flipCardBack = document.createElement("div");
      flipCardBack.className = "flip-card-back";
  
      flipCardInner.appendChild(flipCardFront);
      flipCardInner.appendChild(flipCardBack);
      flipCard.appendChild(flipCardInner);
      container.appendChild(flipCard);
    }
  }