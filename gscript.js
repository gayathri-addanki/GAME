const cards = [
    'card1.jpg', 'card1.jpg',
    'card2.jpg', 'card2.jpg',
    'card3.jpg', 'card3.jpg',
    'card4.jpg', 'card4.jpg',
    'card5.jpg', 'card5.jpg',
    'card6.jpg', 'card6.jpg',
    'card7.jpg', 'card7.jpg',
    'card8.jpg', 'card8.jpg'
];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(cardImage) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url('images/${cardImage}')`;
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.querySelector('.card-back').style.backgroundImage === card2.querySelector('.card-back').style.backgroundImage) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            // Show the modal
            modal.style.display = "block";
        }
    } else {
        flippedCards.forEach(card => card.classList.remove('flipped'));
    }
    flippedCards = [];
}

function init() {
    const shuffledCards = shuffle(cards);
    const gameBoard = document.querySelector('.memory-game');
    shuffledCards.forEach(cardImage => {
        const card = createCard(cardImage);
        gameBoard.appendChild(card);
    });
}


const modal = document.getElementById("myModal");


const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

init();
