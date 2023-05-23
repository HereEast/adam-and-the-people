import { createSpans, glitchLetters } from "./glitch.js";
export { hideLoader, isLoaderHidden, loadElement, loaderText };

const loader = document.querySelector(".load__overlay");
const loadElement = document.querySelector(".loader");
const loaderText = loadElement.textContent;

let isLoaderHidden = false;

//////////////

createSpans(loadElement, loaderText);
glitchLetters(loadElement, loaderText, 3);

// HIDE LOADER
function hideLoader() {
  const tl = gsap.timeline();

  tl.to(loader, {
    delay: 1,
    y: "-100%",
    ease: Power4.easeOut,
    duration: 2
  }).from(
    ".image__section",
    {
      y: window.innerHeight,
      duration: 1.8
    },
    "-=2"
  );

  setTimeout(() => {
    isLoaderHidden = true;
  }, 3000);
}
