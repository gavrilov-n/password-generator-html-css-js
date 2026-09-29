// Variables
let slider = document.getElementById("passwordRange"); // Slider
let output = document.getElementById("nr-password-char"); // Character length text

// Changing character length with slider
output.textContent = slider.value;

slider.addEventListener("input", () => (output.textContent = slider.value));
