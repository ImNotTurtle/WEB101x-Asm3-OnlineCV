const personalInformationItem = document.querySelector("#personal-information");
const personalInformationInput = document.querySelector(
  "#personal-information-input",
);
const emailInputForm = document.querySelector("#email-input-form");
const emailInput = document.querySelector("#email-input");
const inputMessage = document.querySelector("#input-message");
const cardItemsContent = document.querySelectorAll(".card-item-content");
const cardsSection = document.querySelectorAll(".card-section");
const viewToggle = document.querySelector("#view-toggle");
const regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

emailInputForm.addEventListener("submit", handleInput);
for (let i = 0; i < cardsSection.length; i++) {
  cardsSection[i].addEventListener("mouseenter", function () {
    onMouseEnter(i);
  });
  cardsSection[i].addEventListener("mouseleave", function () {
    onMouseLeave(i);
  });
}

viewToggle.addEventListener("click", viewToggleButtonClicked);

function handleInput() {
  let email = emailInput.value;
  let isEmail = regex.test(email);

  if (isEmail) {
    personalInformationReveal();
  } else {
    inputMessage.classList.add("error");
    inputMessage.textContent = "Email không hợp lệ, hãy nhập lại";
  }
}

function personalInformationReveal() {
  personalInformationItem.classList.remove("hidden");
  personalInformationInput.classList.add("hidden");
}
function personalInformationHide() {
  personalInformationItem.classList.add("hidden");
  personalInformationInput.classList.remove("hidden");
}


function viewMoreCardItem(index) {
  cardItemsContent[index].classList.remove("hidden");
}
function viewLessCardItem(index) {
  cardItemsContent[index].classList.add("hidden");
}
function viewToggleButtonClicked() {
  if(enterIndex == -1) return;
  if (isViewMore()) {
    viewMoreCardItem(enterIndex);
  } else {
    viewLessCardItem(enterIndex);
  }
  updateViewLabel();
}

function updateViewLabel() {
  if(enterIndex == -1) return;
  let s = shouldViewMore(enterIndex);
  console.log(s);
  if (s) {
    changeViewMoreLabel();
  } else {
    changeViewLessLabel();
  }
}


function shouldViewMore(index) {
  // Nếu card item bị ẩn thì nên view more
  return cardItemsContent[index]?.classList?.contains("hidden");
}

let count = 0;
let enterIndex = -1;

function changeViewMoreLabel() {
  //view more
  viewToggle.innerHTML = "<span>&#9660;</span> View More ";
}

function changeViewLessLabel() {
  //view less
  viewToggle.innerHTML = "<span>&#9650;</span> View Less ";
}

function isViewMore() {
  let label = viewToggle.textContent.toLowerCase();
  console.log(label);
  return label.includes("more");
}

function onMouseEnter(index) {
  enterIndex = index;
  viewToggle.style.display = 'block';
  // console.log("enter " + index + ", count: " + count++);
  cardsSection[index].appendChild(viewToggle);
  updateViewLabel();
}

function onMouseLeave(index) {
  enterIndex = -1;
  // console.log("leave " + index + ", count " + count++);
  cardsSection[index].removeChild(viewToggle);
  updateViewLabel();
}

// execution
viewToggle.style.display = 'none';
viewToggle.style.justifySelf = 'end';
viewToggle.style.alignSelf = 'end';
for (let i = 0; i < cardItemsContent.length; i++) {
  viewLessCardItem(i);
}
