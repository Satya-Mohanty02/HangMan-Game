const wordDisplay = document.querySelector('.word-display');
const lettersContainer = document.querySelector('.letters-container');
const hangmanParts = document.querySelectorAll('.hangman-part');
const messageElement = document.querySelector('.message');
const hintElement = document.createElement('div');
hintElement.classList.add('hint');
document.querySelector('.container').insertBefore(hintElement, wordDisplay);

const wordGenres = {
    JAVASCRIPT: 'Programming Language',
    HTML: 'Markup Language',
    CSS: 'Stylesheet Language',
    PYTHON: 'Programming Language',
    PROGRAMMING: 'Activity',
    DEVELOPER: 'Profession',
    ELEPHANT: 'Animal',
    BANANA: 'Fruit',
    SUNFLOWER: 'Flower',
    MOUNTAIN: 'Landform',
    RIVER: 'Water Body',
    COMPUTER: 'Technology',
    UKULELE: 'Musical Instrument'
};

let words = Object.keys(wordGenres);
let selectedWord = '';
let wordGenre = '';
let guessedLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = hangmanParts.length;

function selectWordAndHint() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].toUpperCase();
    wordGenre = wordGenres[selectedWord];
    guessedLetters = [];
    incorrectGuesses = 0;
    updateHangman();
    displayWord();
    enableAllButtons();
    messageElement.textContent = '';
    hintElement.textContent = `Hint: Genre is ${wordGenre}`;
}

function displayWord() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function createLetters() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        lettersContainer.appendChild(button);
    });
}

function handleGuess(guessedLetter) {
    guessedLetter = guessedLetter.toUpperCase();
    const button = Array.from(lettersContainer.children).find(btn => btn.textContent === guessedLetter);

    if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        button.disabled = true;

        if (selectedWord.includes(guessedLetter)) {
            displayWord();
            if (!wordDisplay.textContent.includes('_')) {
                messageElement.textContent = 'You won!';
                disableAllButtons();
            }
        } else {
            incorrectGuesses++;
            updateHangman();
            if (incorrectGuesses >= maxIncorrectGuesses) {
                messageElement.textContent = `You lost! The word was: ${selectedWord}`;
                displayWord();
                disableAllButtons();
            }
        }
    }
}

function updateHangman() {
    hangmanParts.forEach((part, index) => {
        part.style.display = index < incorrectGuesses ? 'block' : 'none';
    });
}

function disableAllButtons() {
    Array.from(lettersContainer.children).forEach(button => {
        button.disabled = true;
    });
}

function enableAllButtons() {
    Array.from(lettersContainer.children).forEach(button => {
        button.disabled = false;
    });
}


createLetters();
selectWordAndHint();
