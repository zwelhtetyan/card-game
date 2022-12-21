const cardImgs = [
  { id: 1, imagePath: './images/card-KingHearts.png' },
  { id: 2, imagePath: './images/card-JackClubs.png' },
  { id: 3, imagePath: './images/card-QueenDiamonds.png' },
  { id: 4, imagePath: './images/card-AceSpades.png' },
];

/*
1. insert Cards 🃏
2. click play game and shuffle cards
3. generate card randomly
*/

const insertCards = (cards, isFlip) => {
  const cardContainer = document.querySelector('.card-container');

  const classes = isFlip ? ' flip' : '';

  const html = cards
    .map(
      (img) => `<div class='card'>
  <div class='card-inner${classes}'>
    <div class='card-front'>
      <img src=${img.imagePath} alt='' class='card-img' />
    </div>
    <div class='card-back'>
      <img src='./images/card-back-Blue.png' alt='' class='card-img' />
    </div>
  </div>
</div>`
    )
    .join('');
  cardContainer.innerHTML = html;
};

// insert card
insertCards(cardImgs, false);

// selecting elements
const playGameBtn = document.querySelector('.play-game');
const desc = document.querySelector('.desc');
const cards = document.querySelectorAll('.card');
const innerCards = document.querySelectorAll('.card-inner');

// generateRandomNumber
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// shuffle cards
const shuffleCard = () => {
  // hide play-game button and change description
  playGameBtn.style.display = 'none';
  desc.textContent = 'Shuffling...🃏';

  const lefts = ['-10rem', '-8rem', '-6rem', '-4rem', '-2rem', '0rem', '2rem'];
  const tops = ['0rem', '2rem', '4rem', '6rem', '8rem', '10rem', '12rem'];

  innerCards.forEach((card) => card.classList.add('flip'));

  const INTERVAL = setInterval(() => {
    cards.forEach((card) => {
      const left = generateRandomNumber(0, 7);
      const top = generateRandomNumber(0, 7);

      card.style.position = 'absolute';
      card.style.left = `${lefts[left]}`;
      card.style.top = `${tops[top]}`;
    });
  }, 100);

  const changeTopBarContent = () => {
    document.querySelector('.score-badge').style.display = 'block';
    document.querySelector('.round-badge').style.display = 'block';
    document.querySelector('.top-bar').style.justifyContent = 'space-between';
    desc.textContent = 'Choose the card that you think is the ACE of Spades.';
  };

  const randomCardArr = cardImgs.sort(() => Math.random() - 0.5);

  setTimeout(() => {
    clearInterval(INTERVAL);
    changeTopBarContent();
    insertCards(randomCardArr, true);
  }, 3000);
};

// start the game
playGameBtn.addEventListener('click', shuffleCard);
