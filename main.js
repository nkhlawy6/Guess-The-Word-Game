let gameName = "Guess The Word";
document.title = gameName;
document.getElementById("gameTitle").innerHTML = gameName;
document.querySelector(
  ".footer"
).innerHTML = `${gameName} Game Created By MEl-Nakhlawy`;
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

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
}

window.onload = function () {
  generateInput();
};
