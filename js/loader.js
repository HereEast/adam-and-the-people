import { createSpans, glitchLetters } from "./glitch.js";

const loader = document.querySelector(".load__overlay");
const loadElement = document.querySelector(".loader");
const loaderText = loadElement.textContent;

createSpans(loadElement, loaderText);
glitchLetters(loadElement, loaderText, 1.5);


let interval = setInterval(() => {
    const spans = Array.from(loadElement.querySelectorAll("span"));
    const spansText = spans.map(span => span.textContent).join("");

    if(spansText === loaderText) {
        hideLoader();
        clearInterval(interval);
    }
}, 500)


// Hide loader
function hideLoader() {
    const tl = gsap.timeline();

    tl.to(loader, {
        delay: 0.5,
        y: "-100%",
        ease: Power4.easeOut,
        duration: 2
    })

    .from(".image__section", {
        y: window.innerHeight,
        duration: 2,
    }, "-=2")
}
