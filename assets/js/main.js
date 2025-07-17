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
let numberOfHints = 6;

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
//mange hints
document.querySelector("#hints span").innerHTML = numberOfHints;
const hintButton = document.querySelector("#hints");
console.log(hintButton);
hintButton.addEventListener("click", getHint);
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
        }
      }
      if (event.key === "ArrowLeft") {
        const prevIput = currentIndex - 1;
        if (prevIput <= inputs.length) {
          inputs[prevIput].focus();
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
    // if(numberOfHints===6){
    //   messageArea.innerHTML=`<p>Congratz You Didn't Use Hints</p> `
    // }
    messageArea.innerHTML = `You win <span>${wordToGuess}</span> <p>${definitionWord}</p>`;
    messageArea.style.opacity = 1;
    let allTries = document.querySelectorAll(".inputs > div");
    let control = document.querySelectorAll(".control button");
    console.log(control);
    allTries.forEach((input) => input.classList.add("disabled-inputs"));
    control.forEach((btn) => (btn.style.cursor = "no-drop"));
    hintButton.disabled=true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInput = document.querySelectorAll(
      `try-${currentTry} input`
    );
    currentTryInput.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => {
      input.disabled = false;
    });

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      hintButton.disabled=true;
      messageArea.style.opacity = 1;
      messageArea.innerHTML = `You Lose The Word Is <span> ${wordToGuess}</span>,sorry but you can do it try again.)`;
    }
  }
}
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector("#hints span").innerHTML = numberOfHints;
  }
  if (numberOfHints == 0) {
    hintButton.disabled = true;
  }
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInputs);
  const emptyInableInput = Array.from(enabledInputs).filter((input) => {
    return input.value === "";
  });
 if(emptyInableInput.length>0){
  const randomIndex2=Math.floor(Math.random()*emptyInableInput.length);
  const randomInput=emptyInableInput[randomIndex2];
  const indexOfInputToFill=Array.from(enabledInputs).indexOf(randomInput);
  if(indexOfInputToFill!==-1){
    randomInput.value=wordToGuess[indexOfInputToFill].toUpperCase()
  }
  console.log(randomInput);
 }
}

function handelBackSpace(event){
if(event.key=='Backspace'){
const inputs=document.querySelectorAll('input:not([disabled])');
const currentIndex=Array.from(inputs).indexOf(document.activeElement);
if(currentIndex>=0){
  const currentInput=inputs[currentIndex];
  const prevInput=inputs[currentIndex -1];
  currentInput.value='';
  prevInput.value='';
  prevInput.focus();

  console.log(prevInput);
}

}
}

document.addEventListener('keydown',handelBackSpace)
window.onload = function () {
  generateInput();
};

