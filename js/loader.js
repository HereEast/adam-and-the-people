import { createSpans, glitchLetters } from "./glitch.js";
export { hideLoader, isLoaderHidden, loadElement, loaderText };

const loader = document.querySelector(".load__overlay");
const loadElement = document.querySelector(".loader");
const loaderText = loadElement.textContent;

let isLoaderHidden = false;

//////////////

createSpans(loadElement, loaderText);
glitchLetters(loadElement, loaderText, 3);

// Hide loader
function hideLoader() {
    const tl = gsap.timeline();

    tl.to(loader, {
        delay: 0.5,
        y: "-100%",
        ease: Power4.easeOut,
        duration: 2,
    })
    .from(
        ".image__section",
        {
            y: window.innerHeight,
            duration: 1.5,
        },
        "-=2"
    );

    gsap.delayedCall(2, () => isLoaderHidden = true);
}
