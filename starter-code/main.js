// Variables
const button = document.getElementById;
const slider = document.getElementById("passwordRange"); // Slider
const output = document.getElementById("nr-password-char"); // Character length text
const includeUppercaseElement = document.getElementById("uppercase"); // Uppercase checkbox
const inlcudeLowercaseElement = document.getElementById("lowercase"); // Lowercase checkbox
const inlcudeNumbersElement = document.getElementById("numbers"); // Numbers checkbox
const inlcudeSymbolsElement = document.getElementById("symbols"); // Symbols checkbox
const generateBtn = document.getElementById("btn"); // Generate button
const passwordDisplay = document.getElementById("password-display"); // Password area
const copyBtn = document.getElementById("copy"); // Copy button
const copyText = document.getElementById("copy-text"); // Copy text

// Character arrays
let UPPERCASE_ARR = generateCharactersLowToHigh(65, 90);
let LOWERCASE_ARR = generateCharactersLowToHigh(97, 122);
let NUMBERS_ARR = generateCharactersLowToHigh(48, 57);
let SYMBOLS_ARR = generateCharactersLowToHigh(33, 46)
  .concat(generateCharactersLowToHigh(58, 64))
  .concat(generateCharactersLowToHigh(91, 96))
  .concat(generateCharactersLowToHigh(123, 126));

// Changing character length with slider
output.textContent = slider.value;

slider.addEventListener("input", () => {
  output.textContent = slider.value;
  fillSliderBackground();
});
// Generate Password button
generateBtn.addEventListener("click", () => {
  const characterAmount = slider.value;
  const includeUpperCase = includeUppercaseElement.checked;
  const inlcudeSymbols = inlcudeSymbolsElement.checked;
  const inlcudeNumbers = inlcudeNumbersElement.checked;

  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    inlcudeNumbers,
    inlcudeSymbols,
    inlcudeNumbers,
  );
  passwordDisplay.innerText = password;
  passwordDisplay.classList.remove("password-text");
  passwordDisplay.classList.add("password-text-generated");
});

// Generate password function
function generatePassword(
  characterAmount,
  includeUppercaseElement,
  inlcudeNumbersElement,
  inlcudeSymbolsElement,
) {
  let charCodes = LOWERCASE_ARR;
  if (includeUppercaseElement) {
    charCodes = charCodes.concat(UPPERCASE_ARR);
  }
  if (inlcudeNumbersElement) {
    charCodes = charCodes.concat(NUMBERS_ARR);
  }
  if (inlcudeSymbolsElement) {
    charCodes = charCodes.concat(SYMBOLS_ARR);
  }
  const passwordChars = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordChars.push(String.fromCharCode(characterCode));
  }
  console.log(passwordChars);
  return passwordChars.join("");
}

// Copy button
copyBtn.addEventListener("click", () => {
  const targetElement = document.querySelector(copyBtn.dataset.copy);
  const textToCopy = targetElement.textContent;
  console.log(textToCopy);
  navigator.clipboard.writeText(textToCopy).then(() => {
    copyText.classList.remove("non-display");
    copyText.classList.add("copied-text");
    setTimeout(() => {
      copyText.classList.remove("copied-text");
      copyText.classList.add("non-display");
    }, 2000);
  });
});

// Get all charcodes function
function generateCharactersLowToHigh(low, high) {
  let arr = [];
  for (let i = low; i < high; i++) {
    arr.push(i);
  }
  return arr;
}

//
function fillSliderBackground() {
  let valuePercentage = (slider.value / slider.max) * 100;
  let color =
    "linear-gradient(90deg, var(--green-200) " +
    valuePercentage +
    "%, var(--grey-950) " +
    valuePercentage +
    "%)";
  slider.style.background = color;
}
