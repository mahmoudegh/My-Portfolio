// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

// Get array from letters
let lettersArray = Array.from(letters);

// Select letters container
let lettersContainer = document.querySelector('.letters');

// Generate letters
lettersArray.forEach(letter => {

  // Create span
  let span = document.createElement('span');

  // Create letter text
  let theLetter = document.createTextNode(letter);

  // Append the letter to span
  span.appendChild(theLetter);

  // Add class name to span
  span.className = 'letter-box';

  // Append the span to letters container
  lettersContainer.appendChild(span);
});

// Objects of words & categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi", "Mahmoud Galal Hussein"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get random property
let allKeys = Object.keys(words);

// Random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Ctegory words
let randomPropValue = words[randomPropName];

// Random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// Set category info
document.querySelector('.game-info .category span').innerHTML = randomPropName;

// Select letters guess element
let lettersGuessContainer = document.querySelector('.letters-guess');

// Convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// Create spans depend on words
lettersAndSpace.forEach(letter => {

  // Create empty span
  let emptySpan = document.createElement('span');

  // If letter is space
  if (letter === ' ') {
    
    // Add class to the span
    emptySpan.className = 'has-space';
  }

  // Append the span to letters guess container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select guess spans
let guessSpans = document.querySelectorAll('.letters-guess span');

// Set wrong attempts
let wrongAttempts = 0;

// Set right attempts
let rightAttempts = 0;

// Select the draw element
let theDraw = document.querySelector('.hangman-draw');

// Handel clicking on letters
document.addEventListener('click', (e) => {

  // Set the chose status
  let theStatus = false;
  
  if (e.target.className === 'letter-box') {
    
    e.target.classList.add('clicked');

    // Get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    // Loop on all chosen word letters
    theChosenWord.forEach((wordLetter, wordIndex) => {

      // If clicked letter equal to one of the chosen word letters
      if (theClickedLetter == wordLetter) {
        
        // Set the status to correct
        theStatus = true;

        // Loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {

          if (wordIndex === spanIndex) {
            
            span.innerHTML = theClickedLetter;

            // Increase right attempts
            rightAttempts++;
          }
        });
      }
    });

    // Outside loop
    
    // If letter is wrong
    if (theStatus !== true) {
      
      // Increase the wrong attempts
      wrongAttempts++;

      // Add class wrong on the draw elelement
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play fail sound
      document.getElementById('fail').play();

      if (wrongAttempts === 8) {
        
        gameOver();

        lettersContainer.classList.add('finished');
      }

    } else {

      document.getElementById('success').play();

      // Remove spaces from chosen word
      let space = lettersAndSpace.indexOf(' ');

      if (space > -1) {

        lettersAndSpace.splice(space, 1)
      }

      if (rightAttempts === lettersAndSpace.length) {

        youWin();

        lettersContainer.classList.add('finished');
      }
    }
  }
});

// Game Over function
function gameOver() {
  
  // Create popup div
  let div = document.createElement('div');

  // Create text
  let divText = document.createTextNode(`Game Over, The word is ${randomValueValue}`);

  // Append text to div
  div.appendChild(divText);

  // Add class to div
  div.className = 'popup';

  // Append to the body
  document.body.appendChild(div);
}

// You win function
function youWin() {
  
  // Create popup div
  let div = document.createElement('div');

  // Create text
  let divText = document.createTextNode(`Congratulation, You win, Your wrong tries is ${wrongAttempts}`);

  // Append text to div
  div.appendChild(divText);

  // Add class to div
  div.className = 'popup';

  // Append to the body
  document.body.appendChild(div);
}