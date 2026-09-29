let slider = document.getElementById("passwordRange");
let output = document.getElementById("nr-password-char");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}