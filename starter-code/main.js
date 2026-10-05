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

const barOne = document.getElementById("bar1");
const barTwo = document.getElementById("bar2");
const barThree = document.getElementById("bar3");
const barFour = document.getElementById("bar4");
const strengthText = document.getElementById("strength-text");
const bars = [barOne, barTwo, barThree, barFour];
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
  const includeLowerCase = inlcudeLowercaseElement.checked;
  const inlcudeSymbols = inlcudeSymbolsElement.checked;
  const inlcudeNumbers = inlcudeNumbersElement.checked;

  const password = generatePassword(
    characterAmount,
    includeUpperCase,
    includeLowerCase,
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
  includeLowercaseElement,
  inlcudeNumbersElement,
  inlcudeSymbolsElement,
) {
  let strengthCounter = 0;
  let charCodes = LOWERCASE_ARR;
  if (includeUppercaseElement) {
    charCodes = charCodes.concat(UPPERCASE_ARR);
    strengthCounter += 1;
  }
  if (includeLowercaseElement) {
    strengthCounter += 1;
  }
  if (inlcudeNumbersElement) {
    charCodes = charCodes.concat(NUMBERS_ARR);
    strengthCounter += 1;
  }
  if (inlcudeSymbolsElement) {
    charCodes = charCodes.concat(SYMBOLS_ARR);
    strengthCounter += 1;
  }
  const passwordChars = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordChars.push(String.fromCharCode(characterCode));
  }
  updateStrengthMeter(getStrength(Number(characterAmount), strengthCounter));
  return passwordChars.join("");
}

function getStrength(length, typeCount) {
  let lengthPoints = 0;
  if (length >= 12) {
    lengthPoints = 3;
  } else if (length >= 8) {
    lengthPoints = 2;
  } else if (length >= 6) {
    lengthPoints = 1;
  }

  const score = lengthPoints + typeCount;

  if (score >= 6) {
    return { label: "Strong", bars: 4, color: "green" };
  } else if (score >= 4) {
    return { label: "Medium", bars: 3, color: "yellow" };
  } else if (score >= 2) {
    return { label: "Weak", bars: 2, color: "orange" };
  } else {
    return { label: "Too Weak!", bars: 1, color: "red" };
  }
}

function updateStrengthMeter(strength) {
  bars.forEach((bar, index) => {
    bar.classList.remove(
      "strength-bar-green",
      "strength-bar-yellow",
      "strength-bar-orange",
      "strength-bar-red",
    );
    if (index < strength.bars) {
      bar.classList.add(`strength-bar-${strength.color}`);
    }
  });
  strengthText.innerText = strength.label;
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

// change slider background color
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
