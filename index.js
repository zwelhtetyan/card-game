const cardImgs = [
  { id: 1, imagePath: './images/card-AceSpades.png' },
  { id: 2, imagePath: './images/card-KingHearts.png' },
  { id: 3, imagePath: './images/card-QueenDiamonds.png' },
  { id: 4, imagePath: './images/card-JackClubs.png' },
];

/*
1. insert Cards 🃏
2. click play game and shuffle cards
3. generate card randomly and insert again to dom
4. choose card and calculate win / lose and restart new round
5. total round is 3 and show game over message after final round
6. theme
*/

// selecting elements before insert the cards
const playGameBtn = document.querySelector('.play-game');
const desc = document.querySelector('.desc');
const scoreBadge = document.querySelector('.score-badge');
const roundBadge = document.querySelector('.round-badge');

// default variables
const ACE_ID = 1;
let SCORE = 0;
let ROUND = 1;

const insertCards = (cardsArr, isFlip) => {
  const cardContainer = document.querySelector('.card-container');

  const classes = isFlip ? ' flip' : '';

  const html = cardsArr
    .map(
      (img) => `<button class="card${classes}" id=${img.id} disabled>
      <div class="front">
        <img src="${img.imagePath}" alt="" class="card-img" />
      </div>
      <div class="back">
        <img src="./images/card-back-Blue.png" alt="" class="card-img" />
      </div>
    </button>`
    )
    .join('');

  // insert to the DOM
  cardContainer.innerHTML = html;

  const cards = document.querySelectorAll('.card');

  isFlip &&
    setTimeout(() => cards.forEach((card) => (card.disabled = false)), 4000);

  isFlip && updateROUND(ROUND);

  cards.forEach((card) =>
    card.addEventListener('click', function () {
      flipCard(cards, this);
    })
  );
};

// inserting card
insertCards(cardImgs, false);

const flipCard = (cards, card) => {
  card.classList.remove('flip');
  cards.forEach((card) => (card.disabled = true));
  chooseCard(card.id);
  flipAllCard(cards);

  if (ROUND <= 3) {
    restartNewRound(); //restart new round
  } else {
    setTimeout(gameOverAction, 2500); // game over
  }
};

const flipAllCard = (cards) => {
  const innerCardsToFlip = [...cards].filter((card) =>
    card.classList.contains('flip')
  );

  let idx = 0;

  const INTERVAL = setInterval(() => {
    innerCardsToFlip[idx].classList.remove('flip');

    idx++;

    if (idx > innerCardsToFlip.length - 1) {
      clearInterval(INTERVAL);
    }
  }, 700);
};

const restartNewRound = () => setTimeout(shuffleCard, 3000);

const updateScore = (SCORE) => (scoreBadge.children[0].textContent = SCORE);

const updateROUND = (ROUND) => (roundBadge.children[0].textContent = ROUND);

const chooseCard = (id) => {
  if (+id === ACE_ID) {
    desc.textContent = 'Hit! - Well done 👏🎉';
    desc.style.color = '#10d510';

    SCORE += 10;
    ROUND++;

    updateScore(SCORE);
  } else {
    desc.textContent = 'Missed! - Nice try 🫡';
    desc.style.color = 'red';

    SCORE -= 3;
    ROUND++;

    updateScore(SCORE);
  }
};

const changeTopBarContent = () => {
  scoreBadge.style.display = 'block';
  roundBadge.style.display = 'block';
  scoreBadge.children[0].textContent = SCORE;
  roundBadge.children[0].textContent = ROUND;
  document.querySelector('.top-bar').style.justifyContent = 'space-between';
  desc.textContent = 'Choose the card that you think is the ACE of Spades.';
};

const gameOverAction = () => {
  scoreBadge.style.display = 'none';
  roundBadge.style.display = 'none';
  document.querySelector('.top-bar').style.justifyContent = 'center';
  desc.innerHTML = `Game Over! Final score is <span class="badge">${SCORE}</span>`;
  desc.style.color = 'var(--text-primary)';
  playGameBtn.style.display = 'block';
  playGameBtn.style.animationDelay = 'unset';
  playGameBtn.textContent = 'Play Again';
};

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// shuffle cards
const shuffleCard = () => {
  // hide play-game button and change description
  playGameBtn.style.display = 'none';
  desc.textContent = 'Shuffling...🃏';
  desc.style.color = 'var(--text-primary)';

  const lefts = ['-10rem', '-8rem', '-6rem', '-4rem', '-2rem', '0rem', '2rem'];
  const tops = ['0rem', '2rem', '4rem', '6rem', '8rem', '10rem', '12rem'];

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => card.classList.add('flip'));

  const INTERVAL = setInterval(() => {
    cards.forEach((card) => {
      const left = generateRandomNumber(0, 7);
      const top = generateRandomNumber(0, 7);

      card.style.position = 'absolute';
      card.style.left = `${lefts[left]}`;
      card.style.top = `${tops[top]}`;
    });
  }, 100);

  const randomCardArr = cardImgs.sort(() => Math.random() - 0.5);

  setTimeout(() => {
    clearInterval(INTERVAL);
    changeTopBarContent();
    insertCards(randomCardArr, true);
  }, 3000);
};

// start the game
playGameBtn.addEventListener('click', function () {
  shuffleCard();

  if (this.textContent === 'Play Again') {
    SCORE = 0;
    ROUND = 1;
  }
});

// theme
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

const toggleTheme = () => {
  const doc = document.documentElement;
  const currentTheme = doc.className;
  const theme = currentTheme === 'light' ? 'dark' : 'light';

  doc.className = theme;
  localStorage.setItem('theme', theme);

  // change theme toggler icon
  if (theme === 'light') {
    moon.style.display = 'block';
    sun.style.display = 'none';
  } else {
    moon.style.display = 'none';
    sun.style.display = 'block';
  }
};

(() => {
  const theme = localStorage.getItem('theme') || 'light';

  document.documentElement.className = theme;

  if (theme === 'light') {
    moon.style.display = 'block';
    sun.style.display = 'none';
  } else {
    moon.style.display = 'none';
    sun.style.display = 'block';
  }
})();

const toggleMode = document.querySelector('.toggle-mode');
toggleMode.addEventListener('click', toggleTheme);
