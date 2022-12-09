console.log("Adam%$#?/:.");
import "./glitch.js"

const totalImages = 20;

const range = document.querySelector(".range");
const imageContainer = document.querySelector(".image__container");
const header = document.querySelector(".logo");
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");
const closePopupButton = document.querySelector(".button__close-popup");

let currentPageWidth = window.innerWidth - 40;
let currentValue = sessionStorage.getItem("rangeValue") || 0;

loadImages();

const images = Array.from(document.querySelectorAll(".image"));
const imageWidth = getImageWidth();

//

// window.addEventListener("beforeunload", () => sessionStorage.setItem("rangeValue", currentValue));
// window.addEventListener("load", renderImageSizesOnload);
// window.addEventListener("resize", handleResize);
range.addEventListener("input", scaleImages);
// header.addEventListener("click", (e) => e.preventDefault());

// images.forEach(image => image.addEventListener("click", showPopup));
// popup.addEventListener("click", hidePopup);
// closePopupButton.addEventListener("click", hidePopup);
// window.addEventListener("keydown", hidePopup);


//
// ON LOAD
// function renderImageSizesOnload() {
//     const newWidth = getNewImageWidth(currentValue);

//     updateImageWidth(newWidth);
//     updateProgressBar(currentValue);
// }

//
// RESIZE
// function handleResize() {
//     currentPageWidth = window.innerWidth - 40; 

//     const newWidth = getNewImageWidth(currentValue);
//     updateImageWidth(newWidth);
// }

//
// SCALE IMAGES
function scaleImages() {
    currentValue = Number(this.value);

    const newWidth = getNewImageWidth(currentValue);
    updateImageWidth(newWidth);
    updateProgressBar(currentValue);
}

//
// IMAGE WIDTH
function getImageWidth() {
    const widthArray = new Set(images.map(image => image.clientWidth));
    return Math.min(...widthArray);
}

//
// NEW IMAGE WIDTH
function getNewImageWidth(value) {
    const restWidth = currentPageWidth - imageWidth;
    return imageWidth + restWidth * Number(value) / 100;
}

function updateImageWidth(w) {
    images.forEach(image => {
        if(image.clientWidth < image.clientHeight) {
            image.style.width = w + "px";
        } else {
            image.style.width = 4 * w / 2.8 + "px";
        }
    })
}

//
// LOAD IMAGES
function loadImages() {
    for(let i = 0; i < totalImages; i++) {
        const image = document.createElement("div");
        image.classList.add("image");

        const random = Math.round(Math.random() * totalImages);
        
        if(random <= i) image.classList.add("landscape");
        else image.classList.add("portrait");

        const index = i < 10 ? "0" + i : i;

        image.style.backgroundImage = `url("./assets/images/${index}.jpg")`;
        imageContainer.append(image);
    }
}

//
// UPDATE PROGRESS BAR
function updateProgressBar(value) {
    range.value = value;
    range.style.background = `linear-gradient(to right, var(--black) ${value}%, 
        var(--black) ${value}%, var(--light-grey) 0%, var(--light-grey) 100%)`;
}

// //
// // POPUP
// function showPopup(e) {
//     const url = e.target.style.backgroundImage;
//     popupImage.style.backgroundImage = url;

//     if(e.target.classList.contains("portrait")) {
//         popupImage.classList.add("popup__portrait");
//     } else if(e.target.classList.contains("landscape")) {
//         popupImage.classList.add("popup__landscape");
//     }

//     popup.style.display = "flex";
//     setTimeout(() => popup.style.opacity = 1, 50);
//     document.body.style.overflow = "hidden";
// }

// //
// // HIDE POPUP
// function hidePopup(e) {
//     if(e.target.classList.contains("popup") || e.target.classList.contains("button__close-popup") ||
//     e.key === "Escape") {
//         popup.style.opacity = 0;

//         setTimeout(() => {
//             popupImage.style.backgroundImage = "";
//             popupImage.classList.remove("popup__portrait");
//             popupImage.classList.remove("popup__landscape");

//             popup.style.display = "none";
//             document.body.style.overflow = "";
//         }, 100);
//     } else return;
// }