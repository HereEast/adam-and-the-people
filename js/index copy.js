console.log("Adam%$#?/:.");

import "./logo.js";
import "./loader.js";

const minWidth = 75;
const maxWidth = 100;
const totalImages = 155;

createImages();

const main = document.querySelector(".main");
const range = document.querySelector(".range");
const imgElements = Array.from(document.querySelectorAll(".image"));
const imageUrls = imgElements.map((image) => image.src.split("/").reverse()[0]);
const images = Array.from(document.querySelectorAll(".image__container"));

const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");
const buttonClose = document.querySelector(".button__close-popup");
const imageCount = document.querySelector(".popup__current-count");

const popupArrow = document.querySelector(".popup__arrow");
const totalCount = document.querySelector(".popup__total-count");

let currentPageWidth = main.clientWidth;
let currentValue = sessionStorage.getItem("inputValue") || 0;

let currentIndex;
let isPopupOpen = false;
let touchStartX = null;
let touchMoveX = null;

totalCount.textContent = totalImages;
updateProgressBar(currentValue);

////////////

imgElements.forEach(image => {
    image.addEventListener("load", loadImage);
});

window.addEventListener("beforeunload", saveToSessionStorage);
window.addEventListener("load", handlePageUpdates);
window.addEventListener("resize", handlePageUpdates);

range.addEventListener("input", scaleImages);

images.forEach((image) => image.addEventListener("click", openPopup));
buttonClose.addEventListener("click", closePopup);
window.addEventListener("keydown", closePopup);
window.addEventListener("keydown", changeImages);
popup.addEventListener("click", changeImages);
popup.addEventListener("mousemove", showArrow);

popup.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchMoveX = 0;
});

popup.addEventListener("touchmove", (e) => {
  touchMoveX = e.touches[0].clientX;
});

popup.addEventListener("touchend", swipeImage);

////////////
////////////

// SWIPE IMAGE (MOBILE)
function swipeImage(e) {
  const linkOrButton = e.target.tagName === "A" || e.target.tagName === "BUTTON";

  const diff = Math.abs(touchStartX - touchMoveX);
  const validSwipe = touchMoveX !== 0 && diff >= 10;

  if (touchStartX > touchMoveX && !linkOrButton && validSwipe) nextImage();
  if (touchStartX < touchMoveX && !linkOrButton && validSwipe) prevImage();
  else return;
}

// CHANGE IMAGES
function changeImages(e) {
  if (e.type === "keydown") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    else return;
  }

  if (e.type === "click" && isPopupOpen && window.innerWidth >= 1024) {
    const leftSide = e.clientX < currentPageWidth / 2;
    const rightSide = e.clientX >= currentPageWidth / 2;
    const linkOrButton = e.target.tagName === "A" || e.target.tagName === "BUTTON";

    if (leftSide && !linkOrButton) prevImage();
    if (rightSide && !linkOrButton) nextImage();
  }
}

// NEXT IMAGE
function nextImage() {
  currentIndex += 1;

  if (currentIndex >= totalImages) currentIndex = 0;
  showImage(currentIndex);
}

// PREV IMAGE
function prevImage() {
  currentIndex -= 1;

  if (currentIndex <= 0) currentIndex = totalImages - 1;
  showImage(currentIndex);
}

// SHOW IMAGE
function showImage(index) {
  const fileName = imageUrls[index];
  const imgElement = imgElements.find((img) => img.src.includes(fileName));
  const imgContainer = imgElement.closest(".image__container");

  popupImage.src = `../assets/images/${fileName}`;

  popupImage.addEventListener("load", () => {
    removeImageOrientation();
    updateImageOrientation(imgContainer);
    updateCount(index);
  });
}

// OPEN POPUP
function openPopup(e) {
  const targetContainer = e.target.closest(".image__container");
  const src = e.target.src.split("/").reverse()[0];

  popupImage.src = `../assets/images/${src}`;
  currentIndex = imageUrls.findIndex((url) => url === src);

  updateImageOrientation(targetContainer);
  updateCount(currentIndex);

  popup.classList.add("popup--open");
  document.body.classList.add("scroll--canceled");
  setTimeout(() => (popup.style.opacity = 1), 50);

  isPopupOpen = true;
}

// CLOSE POPUP
function closePopup(e) {
  if (e.target.classList.contains("button__close-popup") || e.key === "Escape") {
    popup.style.opacity = 0;

    setTimeout(() => {
      popupImage.src = "";
      removeImageOrientation();

      popup.classList.remove("popup--open");
      document.body.classList.remove("scroll--canceled");

      isPopupOpen = false;
    }, 100);
  } else return;
}

// UPDATE COUNT
function updateCount(idx) {
  const newCount = String(idx + 1).padStart(3, "0");
  imageCount.innerHTML = newCount;
}

// SHOW ARROW
function showArrow(e) {
  if (window.innerWidth < 1024) return;

  popupArrow.style.left = e.clientX + 20 + "px";
  popupArrow.style.top = e.clientY + "px";

  popupArrow.style.opacity = 1;

  if (e.clientX <= window.innerWidth / 2) popupArrow.innerHTML = "PREV";
  else popupArrow.innerHTML = "NEXT";

  if (e.clientY <= 40 || e.clientY > window.innerHeight - 60) {
    popupArrow.style.opacity = 0;
  }
}

// UPDATE IMAGE ORIENTATION
function updateImageOrientation(container) {
  if (container.classList.contains("landscape")) {
    popupImage.classList.add("popup--landscape");
  } else {
    popupImage.classList.add("popup--portrait");
  }
}

// REMOVE IMAGE ORIENTATION
function removeImageOrientation() {
  popupImage.classList.remove("popup--landscape");
  popupImage.classList.remove("popup--portrait");
}

// RESIZE AND RELOAD
function handlePageUpdates() {
  currentPageWidth = main.clientWidth;

  updateImageWidth();
}

// SCALE IMAGES
function scaleImages() {
  currentValue = Number(this.value);

  updateProgressBar(currentValue);
  updateImageWidth();
}

// NEW IMAGE WIDTH
function updateImageWidth() {
  const newMinWidth = minWidth + ((currentPageWidth - minWidth) * Number(currentValue)) / 100;
  const newMaxWidth = maxWidth + ((currentPageWidth - maxWidth) * Number(currentValue)) / 100;

  images.forEach((image) => {
    if (image.classList.contains("portrait")) {
      image.style.width = newMinWidth + "px";
    }
    if (image.classList.contains("landscape")) {
      image.style.width = newMaxWidth + "px";
    }
  });
}

// LOAD IMAGES
function loadImage(e) {
  const image = e.target;
  const imageContainer = image.closest(".image__container");

  if (image.clientWidth > image.clientHeight) {
    imageContainer.classList.add("landscape");
  } else {
    imageContainer.classList.add("portrait");
  }

  imageContainer.classList.add("visible");
}


// CREATE IMAGES
function createImages() {
  const imageSection = document.querySelector(".image__section");

  for (let i = 0; i < totalImages; i++) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image__container");

    const image = new Image();
    image.classList.add("image");

    const index = i < 10 ? "0" + i : i;
    image.src = `../assets/images/${index}.jpg`;

    imageContainer.append(image);
    imageSection.append(imageContainer);
  }
}

// SESSION STORAGE
function saveToSessionStorage() {
  sessionStorage.setItem("inputValue", currentValue);
  sessionStorage.setItem("currentSession", true);
}

// RANGE INPUT
function updateProgressBar(value) {
  range.value = value;
  range.style.background = `linear-gradient(to right, var(--black) ${value}%, 
        var(--black) ${value}%, var(--light-grey) 0%, var(--light-grey) 100%)`;
}
