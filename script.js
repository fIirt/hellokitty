document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!isCrosswordActive()) {
            advanceDialogue();
        }
    }
});

let currentDialogue = 0;
let currentChar = 0;
let typingSpeed = 20; // Milliseconds per character
let crosswordVisible = false; // Track if crossword is visible
const dialogues = [
    "Hello Emmy!",
    "I'm Hello Kitty! You obviously know who I am already.",
    "Kamen has prepared a gift for you and he told me to give it to you",
    "But!!!!!",
    "First, you have to do some things to receive the gift obviously..",
    "I'm not gonna give to you that easily.",
    "I've heard from Kamen that you're really good at solving crosswords",
    "Try solving this one and I'll give you the gift.",
    "YAY! I will show you your gift now!",
];

function isCrosswordActive() {
    return crosswordVisible;
}

function advanceDialogue() {
    if (currentDialogue < dialogues.length && !isCrosswordActive()) {
        if (currentChar < dialogues[currentDialogue].length) {
            // Show the next character
            document.getElementById('dialogue-text').innerText = dialogues[currentDialogue].substring(0, currentChar + 1);
            currentChar++;
            setTimeout(advanceDialogue, typingSpeed);
        } else {
            // Prepare for the next line
            currentDialogue++;
            currentChar = 0;
            if (currentDialogue === 8) {
                // Trigger crossword puzzle after the 8th dialogue
                showCrossword();
            }
            if (currentDialogue === dialogues.length) {
                // Redirect to the gift page after the last dialogue
                window.location.href = 'https://fiirt.github.io/letter/'; // Replace with the actual URL of the gift page
            }
        }
    } 
}

function showCrossword() {
    crosswordVisible = true; // Set crossword as active
    document.getElementById('dialogue-box').style.display = 'none'; // Hide dialogue box
    let crosswordContainer = document.getElementById('crossword-container');
    crosswordContainer.style.display = 'block'; // Show crossword container

    crosswordClues.forEach(clue => {
        let clueElement = document.createElement('p');
        clueElement.innerText = clue.clue;
        crosswordContainer.appendChild(clueElement);

        let inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.dataset.answer = clue.answer;
        crosswordContainer.appendChild(inputElement);
    });

    let submitButton = document.createElement('button');
    submitButton.innerText = 'Submit Answers';
    submitButton.onclick = checkCrosswordAnswers;
    crosswordContainer.appendChild(submitButton);
}

function checkCrosswordAnswers() {
    let correct = true;
    document.querySelectorAll('#crossword-container input').forEach(input => {
        if (input.value.toLowerCase() !== input.dataset.answer) {
            correct = false;
        }
    });

    if (correct) {
        crosswordVisible = false; // Set crossword as not active
        // Hide crossword and show dialogue box again
        document.getElementById('crossword-container').style.display = 'none';
        document.getElementById('dialogue-box').style.display = 'block';
        advanceDialogue(); // Continue with the dialogue
    } else {
        alert('umm somethin aint right...');
    }
}

// Crossword Clues and Answers
const crosswordClues = [
    { clue: "Who is the best boy ever?", answer: "kamen" },
    { clue: "What month did we confess to each other?", answer: "april" },
    { clue: "Last movie we watched together?", answer: "rush hour" },
    { clue: "Kamen's favorite drink", answer: "queens" },
    { clue: "Date we cannot wait for?", answer: "picnic" },
    { clue: "A love song Kamen loves to listen to when thinking of you?", answer: "understand" },
    { clue: "The nickname we have for each other?", answer: "baby" }
];

// Initialize the first dialogue
advanceDialogue();
