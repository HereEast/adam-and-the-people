import { createSpans, glitchLetters } from "./glitch.js";

const headerLink = document.querySelector(".logo__link");
const header = document.querySelector("h1");
const headerText = header.innerHTML;


headerLink.addEventListener("click", (e) => e.preventDefault());
header.addEventListener("mouseenter", glitch);
header.addEventListener("click", glitch);


function glitch() {
    createSpans(header, headerText);
    glitchLetters(header, headerText, 0.6);
}
