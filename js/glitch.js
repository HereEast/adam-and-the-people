const header = document.querySelector("h1");
const initialHeader = header.innerHTML;
const glitch = Array.from("¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/<>/");

createSpans();
const spans = Array.from(document.querySelectorAll("span"));

header.addEventListener("mouseenter", animateLetters);

// Animate letters
function animateLetters(e) {
    spans.forEach((span, i) => {
        let interval = setInterval(() => {
            randomGlitch(span);
        }, 100)
    
        setTimeout(() => {
            setTimeout(() => {
                clearInterval(interval);
                setInitialLetter(initialHeader, i, span);
            }, i * 100)
        }, 600)
    })
}

// Set initial state at the end
function setInitialLetter(header, i, span) {
    if(header[i] === " ") span.innerHTML = "&nbsp;";
    else span.innerHTML = header[i];
}

// Create spans
function createSpans() {
    const spanList = [...initialHeader]
        .map(letter => `<span>${letter}</span>`).join("");
        header.innerHTML = spanList;
}

// Random letters
function randomGlitch(span) {
    let randomGlitch = Math.floor(Math.random() * glitch.length);
    span.innerHTML = glitch[randomGlitch];
}