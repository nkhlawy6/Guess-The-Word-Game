let gameName = "Guess The Word";
document.title = gameName;
document.getElementById("gameTitle").innerHTML = gameName;
document.querySelector(
  ".footer"
).innerHTML = `${gameName} Game Created By MEl-Nakhlawy`;
let messageArea = document.getElementById("message");

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let wordToGuess = "";
let definitionWord = "";

const words = [
  {
    word: "binary",
    definition: "A system of representing data using two symbols: 0 and 1.",
  },
  {
    word: "method",
    definition: "A function associated with a class or object in programming.",
  },
  {
    word: "string",
    definition: "A sequence of characters used to represent text.",
  },
  {
    word: "syntax",
    definition: "The rules that define the structure of code in a language.",
  },
  {
    word: "server",
    definition: "A system that provides services or resources to clients.",
  },
  {
    word: "client",
    definition: "A system or application that requests services from a server.",
  },
  {
    word: "cursor",
    definition: "A pointer used to navigate data in databases or GUIs.",
  },
  {
    word: "module",
    definition: "A self-contained unit of functionality in a program.",
  },
  {
    word: "socket",
    definition: "An endpoint for sending or receiving data across a network.",
  },
  {
    word: "object",
    definition: "An instance of a class containing data and behaviors.",
  },
  {
    word: "filter",
    definition: "A function that selects data matching certain conditions.",
  },
  {
    word: "thread",
    definition: "A path of execution within a process for multitasking.",
  },
  {
    word: "system",
    definition: "A collection of hardware/software that works together.",
  },
  {
    word: "return",
    definition:
      "A statement that ends a function and optionally gives a value.",
  },
  {
    word: "driver",
    definition: "Software that enables hardware to communicate with the OS.",
  },
  {
    word: "update",
    definition: "To modify a program to add features or fix issues.",
  },
  {
    word: "buffer",
    definition: "Temporary memory storage used during data processing.",
  },
  {
    word: "login",
    definition: "The process of gaining access to a system by credentials.",
  },
];
let randomIndex = Math.floor(Math.random() * words.length);
wordToGuess = words[randomIndex].word.toLowerCase();
definitionWord = words[randomIndex].definition;
function generateInput() {
  const inputsContainer = document.getElementById("inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>try-${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput <= inputs.length) {
          inputs[nextInput].focus();
          console.log(nextInput);
        }
      }
      if (event.key === "ArrowLeft") {
        const prevIput = currentIndex - 1;
        if (prevIput <= inputs.length) {
          inputs[prevIput].focus();
          console.log(prevIput);
        }
      }
    });
  });
}
const guessButton = document.querySelector(".check");
console.log(wordToGuess);
console.log(definitionWord);
guessButton.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("wrong");
      successGuess = false;
    }
  }

  if (successGuess) {
    messageArea.innerHTML = `You win <span>${wordToGuess}</span> <p>${definitionWord}</p>`;
    messageArea.style.opacity = 1;
    let allTries = document.querySelectorAll(".inputs > div");
    let control=document.querySelectorAll('.control button');
    console.log(control);
    allTries.forEach((input) => input.classList.add("disabled-inputs"));
    control.forEach((btn) => btn.style.cursor='no-drop');

  } else {
    console.log("wrong");
  }
}


window.onload = function () {
  generateInput();
};
