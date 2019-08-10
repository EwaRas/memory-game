const animals = [{ text: "dog", img: "images/dog.jpg", audio: "audio/dog.mp3" }, { text: "cat", img: "images/cat.jpg", audio: "audio/cat.mp3" }, { text: "bird", img: "images/bird.jpg", audio: "audio/bird.mp3" }, { text: "horse", img: "images/horse.jpg", audio: "audio/horse.mp3" }, { text: "pig", img: "images/pig.jpg", audio: "audio/pig.mp3" }, { text: "sheep", img: "images/sheep.jpg", audio: "audio/sheep.mp3" }, { text: "fish", img: "images/fish.jpg", audio: "audio/fish.mp3" }, { text: "mouse", img: "images/mouse.jpg", audio: "audio/mouse.mp3" }, { text: "lion", img: "images/lion.jpg", audio: "audio/lion.mp3" }, { text: "monkey", img: "images/monkey.jpg", audio: "audio/monkey.mp3" }, { text: "snake", img: "images/snake.jpg", audio: "audio/snake.mp3" }, { text: "bear", img: "images/bear.jpg", audio: "audio/bear.mp3" }];
const cards = [...document.getElementsByClassName("inner-card")];
let images = [...document.getElementsByClassName("card-back-image")];
let names = [...document.getElementsByClassName("description")];
let sound = [...document.getElementsByTagName('audio')];
let availableAnimals = [...animals];
let cardsCopy = [...cards];

let flippedCard1 = 0;
let flippedCard2 = 0;
let counter = 0;

function drawRandomCards() {
    let randomAnimal;
    let randomCardNumber;

    for (let i = 0; i <= cardsCopy.length; i++) {
        randomAnimal = availableAnimals.splice(Math.floor(Math.random() * availableAnimals.length), 1);
        for (let j = 0; j < 2; j++) {
            randomCardNumber = Math.floor(Math.random() * images.length);

            images[randomCardNumber].style.backgroundImage = `url(${randomAnimal[0].img})`;
            names[randomCardNumber].innerHTML = randomAnimal[0].text;
            cardsCopy[randomCardNumber].setAttribute('data-option', `${randomAnimal[0].text}`);
            sound[randomCardNumber].src = `${randomAnimal[0].audio}`;

            images.splice(randomCardNumber, 1);
            names.splice(randomCardNumber, 1);
            cardsCopy.splice(randomCardNumber, 1);
            sound.splice(randomCardNumber, 1);
        }

    }
    cardsCopy = [...cards];
    images = [...document.getElementsByClassName("card-back-image")];
    names = [...document.getElementsByClassName("description")];
    sound = [...document.getElementsByTagName('audio')];
    if (availableAnimals.length <= 3) return availableAnimals = [...animals];
    else return availableAnimals;
};

drawRandomCards();

function flip(e) {
    e.currentTarget.querySelector('audio').play();
    e.currentTarget.classList.add('flipped');
}

function flipBack() {
    flippedCard1.classList.remove('flipped');
    flippedCard2.classList.remove('flipped');
}

function userChoice(e) {
    if (flippedCard1 === 0) {
        flippedCard1 = e.currentTarget;
        e.currentTarget.removeEventListener('click', game);
    } else {
        flippedCard2 = e.currentTarget;
        blockClick();
        checkForMatch();
    }
}

function clearCardData() {
    flippedCard1 = 0;
    flippedCard2 = 0;
}

function blockClick() {
    cards.forEach(card => {
        card.removeEventListener('click', game);
    });
}

function changeSubtitle() {
    document.querySelector('.subtitle').innerHTML = `Can you find a match?`;
}

function allowClick() {
    cards.forEach(card => {
        if (!card.classList.contains('flipped')) card.addEventListener('click', game);
    });
    clearCardData();
    setTimeout(changeSubtitle, 2000);
}

function checkForMatch() {
    if (flippedCard1.dataset.option == flippedCard2.dataset.option) {
        counter++;
        document.querySelector('.subtitle').innerHTML = `It's a match!`;
        allowClick();
        if (counter === cards.length / 2) setTimeout(showEndPanel, 3000);
    } else {
        setTimeout(flipBack, 2700);
        setTimeout(allowClick, 2700);
    }
}

function clearCards() {
    cardsCopy.forEach(card => {
        card.classList.remove('flipped');
        card.removeAttribute('data-option');
    });
    images.forEach(image => {
        image.style.backgroundImage = '';
    });
    names.forEach(name => {
        name.innerHTML = '';
    });
    sound.forEach(word => {
        word.src = '';
    });
}

function startNewGame() {
    clearCards();
    setTimeout(drawRandomCards, 1000);
    cards.forEach(card => {
        card.addEventListener('click', game);
    });
    counter = 0;
}

function showEndPanel() {
    let endPanel = document.createElement("div");
    let paragraph = document.createElement("p");
    let paraText = document.createTextNode("Wanna play again?");
    let large = document.createElement("span");
    let largeText = document.createTextNode("AWESOME!");
    large.appendChild(largeText);
    paragraph.appendChild(large);
    paragraph.appendChild(paraText);
    let yesButton = document.createElement("button");
    let yesText = document.createTextNode("YES!");
    yesButton.appendChild(yesText);
    let noButton = document.createElement("button");
    let noText = document.createTextNode("NO!");
    noButton.appendChild(noText);
    endPanel.appendChild(paragraph);
    endPanel.appendChild(yesButton);
    endPanel.appendChild(noButton);

    endPanel.classList.add('end-game-panel');

    document.querySelector('.card-panel-wrapper').insertBefore(endPanel, (document.querySelector('.card1')));

    const buttons = [...document.querySelectorAll('.end-game-panel > button')];


    function exitEndPanel() {
        let endPanel = document.querySelector('.end-game-panel');
        endPanel.parentNode.removeChild(endPanel);
    }

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            exitEndPanel();
            if (e.currentTarget.textContent == 'YES!') {
                startNewGame();
            };
        });
    });
}

function game(e) {
    flip(e);
    userChoice(e);
}

document.querySelector('.new-game-button').addEventListener('click', function() {
    clearCards();
    clearCardData();
    startNewGame();
});

cards.forEach(card => {
    card.addEventListener('click', game);
});