export { createSpans, glitchLetters };


// Glitch effect
function glitchLetters(parentElement, textElement, seconds) {
    const spans = Array.from(parentElement.querySelectorAll(".span--letter"));

    spans.forEach((span, i) => {
        const interval = setInterval(() => {
            randomGlitch(span);
        }, 100)

        setTimeout(() => {
            setTimeout(() => {
                clearInterval(interval);
                setInitialLetter(textElement, i, span);
            }, i * 200)
        }, seconds * 1000)
    })
}


// Set initial state at the end
function setInitialLetter(textElement, i, span) {
    if(textElement[i] === " ") span.innerHTML = "&nbsp;";
    else span.innerHTML = textElement[i];
}


// Create spans
function createSpans(parentElement, textElement, className) {
    parentElement.innerHTML = "";
    const letters = Array.from(textElement);

    letters.forEach(letter => {
        const span = document.createElement("span");
        span.classList.add("span--letter");
        span.textContent = letter;

        parentElement.append(span);
    })
}


// Random letters
function randomGlitch(span) {
    const glitchSymbols = Array.from("¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/<>/");

    const idx = Math.floor(Math.random() * glitchSymbols.length);
    span.innerHTML = glitchSymbols[idx];
}

