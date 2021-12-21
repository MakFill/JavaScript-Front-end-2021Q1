const closing = document.querySelectorAll(".popup__close");
const popup = document.querySelector(".popup ");
const popupForm = document.querySelector(".popup-wrapper");

const html = document.querySelector("html");

const donateNow = document.querySelector(".pay-feed-btn");
const donateVolunt = document.querySelector(".footer__btn");

donateNow.addEventListener("click", function () {
  popupForm.style.display = "block";
  html.style.overflowY = "hidden";
  popup.style.display = "block";
});

donateVolunt.addEventListener("click", function () {
  popupForm.style.display = "block";
  html.style.overflowY = "hidden";
  popup.style.display = "block";
});

closing.forEach((c) =>
  c.addEventListener("click", function () {
    popupForm.style.display = "none";
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "none";
    html.style.overflowY = "auto";
  })
);

popupForm.addEventListener("click", function () {
  popupForm.style.display = "none";
  step1.style.display = "none";
  step2.style.display = "none";
  step3.style.display = "none";
  html.style.overflowY = "auto";
});

popup.addEventListener("click", (e) => e.stopPropagation());

const buttons = document.querySelectorAll(".popup__button");
const step1 = document.querySelector(".popup-step1");

buttons.forEach(function (step) {
  step.addEventListener("click", function () {
    step1.style.display = "block";
    popup.style.display = "none";
  });

  step.onclick = function () {
    firstValue.classList.remove("step1-btn-hover");
    dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
    if (step.classList.contains("popup__button_other")) {
      amountBtn.classList.add("step1-btn-hover");
    }
    dollars.forEach(function (dollar) {
      if (
        dollar.textContent.slice(1, dollar.textContent.length) ==
        step.textContent.slice(1, step.textContent.length)
      ) {
        dollar.classList.add("step1-btn-hover");
        dollarSign.classList.remove("opacity-1");
        amountBtn.classList.remove("step1-btn-hover");
      }
    });
    dollarsInput.value = "";
  };
});

const dollars = document.querySelectorAll(".step1-main__button");
const dollarsInput = document.querySelector(".main-amount__input");
const dollarSign = document.querySelector(".main-amount__dollar");
const firstValue = document.querySelector(".step1-first-btn");
const amountBtn = document.querySelector(".main-amount__btn");

if (dollarsInput.value == "") {
  firstValue.classList.add("step1-btn-hover");
}

dollarsInput.oninput = function () {
  if (dollarsInput.value > 0) {
    dollarSign.classList.add("opacity-1");
    dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
    amountBtn.classList.add("step1-btn-hover");
  } else {
    amountBtn.classList.add("step1-btn-hover");
    dollarSign.classList.remove("opacity-1");
    firstValue.classList.remove("step1-btn-hover");
  }
};

dollarsInput.addEventListener("input", function (e) {
  if (dollarsInput.value == "") {
    dollarsInput.value = "";
  }

  if (dollarsInput.value.toString().length > 4) {
    dollarsInput.value = dollarsInput.value.toString().slice(0, -1);
  }
});

dollars.forEach(
  (dollar) =>
    (dollar.onclick = function () {
      dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
      dollar.classList.add("step1-btn-hover");
      amountBtn.classList.remove("step1-btn-hover");
      dollarSign.classList.remove("opacity-1");
      dollarsInput.value = "";
    })
);

amountBtn.onclick = setAmountHover;
dollarsInput.onclick = setAmountHover;

function setAmountHover() {
  dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
  amountBtn.classList.add("step1-btn-hover");
}

const form1 = document.querySelector(".popup-step1__submit");

// step 2

const step2 = document.querySelector(".popup-step2");

form1.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    amountBtn.classList.contains("step1-btn-hover") &&
    dollarsInput.value == ""
  ) {
    amountBtn.classList.remove("step1-btn-hover");
    firstValue.classList.add("step1-btn-hover");
    setTimeout(function () {
      step1.style.display = "none";
      step2.style.display = "block";
    }, 500);
  } else {
    step1.style.display = "none";
    step2.style.display = "block";
  }
});

const prevBtn2 = document.querySelector(".prev-2");

prevBtn2.addEventListener("click", function () {
  step2.style.display = "none";
  step1.style.display = "block";
});

const form2 = document.querySelector(".popup-step2__submit");

// step 3

const step3 = document.querySelector(".popup-step3");

form2.addEventListener("submit", function (e) {
  e.preventDefault();

  step2.style.display = "none";
  step3.style.display = "block";
});

const creditCard = document.querySelector(".step3__credit");
const cvv = document.querySelector(".step3__cvv-card");

creditCard.addEventListener("input", function () {
  if (creditCard.value == "") {
    creditCard.value = "";
  }

  if (creditCard.value.toString().length > 16) {
    creditCard.value = creditCard.value.toString().slice(0, -1);
  }
});

cvv.addEventListener("input", function () {
  if (cvv.value == "") {
    cvv.value = "";
  }

  if (cvv.value.toString().length > 3) {
    cvv.value = cvv.value.toString().slice(0, -1);
  }
});

const prev3Btn = document.querySelector(".prev-3");
const form3 = document.querySelector(".popup-step3__form");

prev3Btn.addEventListener("click", function () {
  step3.style.display = "none";
  step2.style.display = "block";
});

form3.addEventListener("submit", function (e) {
  e.preventDefault();

  html.style.overflowY = "auto";
  step3.style.display = "none";
  popupForm.style.display = "none";
});

// Close form

function stopProp(e) {
  e.stopPropagation();
}

step1.onclick = stopProp;
step2.onclick = stopProp;
step3.onclick = stopProp;

// Quick donate
const quickDonateBtn = document.querySelector(".quick-donate-btn");
const quickInput = document.querySelector(".number-input");

quickDonateBtn.addEventListener("click", function () {
  if (quickInput.value) {
    dollarsInput.value = quickInput.value;
    quickInput.value = "";
    dollarSign.classList.add("opacity-1");
    dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
    amountBtn.classList.add("step1-btn-hover");
  } else {
    dollarsInput.value = "";
    dollars.forEach((dollar) => dollar.classList.remove("step1-btn-hover"));
    firstValue.classList.add("step1-btn-hover");
    dollarSign.classList.remove("opacity-1");
    amountBtn.classList.remove("step1-btn-hover");
  }
  popupForm.style.display = "block";
  popup.style.display = "none";
  step1.style.display = "block";
});

// Select

const selectPet = document.querySelector(".select__list");
const selectElem = document.querySelectorAll(".select__elem");

selectPet.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  e.stopPropagation();
  e.preventDefault();
});
selectElem.forEach((elem) =>
  elem.addEventListener("click", function (e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  })
);
