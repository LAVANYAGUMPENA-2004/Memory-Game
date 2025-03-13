const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Function to flip the card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Function to check if two cards match
function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// Disable the matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip the cards if no match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// Reset the board state
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle the cards at the start
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Add event listeners to all cards
cards.forEach(card => card.addEventListener('click', flipCard));


const countdownDisplay = document.getElementById('countdown'); // The countdown timer element
let countdownTime = 20; // Time limit (in seconds)
let countdownTimer; // The countdown timer interval

// Start the countdown timer
function startCountdown() {
  countdownTimer = setInterval(() => {
    countdownTime--; // Decrease the countdown by 1 every second
    countdownDisplay.textContent = countdownTime; // Update the countdown display on the page

    // If the countdown reaches 0, stop the timer and trigger game over
    if (countdownTime <= 0) {
      clearInterval(countdownTimer); // Stop the countdown timer
      alert('Time\'s up! Game over!');
      // Here you can also reset the game or end the game if necessary
    }
  }, 1000); // Update every second
}

// Start the countdown when the game starts (can be triggered elsewhere in your game logic)
startCountdown();
