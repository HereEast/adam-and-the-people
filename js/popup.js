console.log("Popup File");

const imgElements = Array.from(document.querySelectorAll(".image"));
const imageUrls = imgElements.map((image) => image.src.split("/").reverse()[0]);
const images = Array.from(document.querySelectorAll(".image__container"));


const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");
const buttonClose = document.querySelector(".button__close-popup");
const imageCount = document.querySelector(".popup__current-count");

const popupArrow = document.querySelector(".popup__arrow");
const totalCount = document.querySelector(".popup__total-count");

let currentIndex;
let isPopupOpen = false;
let touchStartX = null;
let touchMoveX = null;

//


images.forEach((image) => image.addEventListener("click", openPopup));
// buttonClose.addEventListener("click", closePopup);
// window.addEventListener("keydown", closePopup);
// window.addEventListener("keydown", changeImages);
// popup.addEventListener("click", changeImages);
// popup.addEventListener("mousemove", showArrow);

// popup.addEventListener("touchstart", (e) => {
//   touchStartX = e.touches[0].clientX;
//   touchMoveX = 0;
// });

// popup.addEventListener("touchmove", (e) => {
//   touchMoveX = e.touches[0].clientX;
// });

// popup.addEventListener("touchend", swipeImage);




// OPEN POPUP
function openPopup(e) {
  const targetContainer = e.target.closest(".image__container");
  const src = e.target.src.split("/").reverse()[0];

  popupImage.src = `../assets/images/${src}`;
  currentIndex = imageUrls.findIndex((url) => url === src);

  updateImageOrientation(targetContainer);
  updateCount(currentIndex);

  totalCount.innerHTML = totalImages > 100 ? totalImages : "0" + totalImages;

  popup.classList.add("popup--open");
  document.body.classList.add("scroll--canceled");
  setTimeout(() => (popup.style.opacity = 1), 100);

  isPopupOpen = true;
}