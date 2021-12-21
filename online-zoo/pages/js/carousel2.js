const petsCont = document.querySelector(".pets-slides");
const sliders = document.querySelectorAll(".pet-slide");
const slideLeft = document.querySelector(".pet-mod-left");
const slideRight = document.querySelector(".pet-mod-right");
const gradient = document.querySelectorAll(".gradient");

let slideFirst = 0;
let slideLast;
let gradCoef = 4;

let mainSlidesCoef = -460;

slideRight.addEventListener("click", function () {
  petsCont.classList.add("slides-trans");
  petsCont.style.left = -940 + "px";

  if (slideFirst === 0) {
    slideLast = 7;
  } else {
    slideLast = slideFirst - 1;
  }

  if (slideFirst < 4) {
    gradCoef = slideFirst + 4;
  } else {
    gradCoef = slideFirst - 4;
  }

  gradient[gradCoef].classList.add("grad-none");
  gradient[gradCoef + 8].classList.add("grad-none");
  petsCont.ontransitionend = function () {
    petsCont.classList.remove("slides-trans");
    petsCont.style.left = -460 + "px";

    gradient[gradCoef].classList.remove("grad-none");
    gradient[gradCoef + 8].classList.remove("grad-none");

    sliders[slideLast].after(sliders[slideFirst]);
    sliders[slideLast + 8].after(sliders[slideFirst + 8]);

    if (slideFirst === 7) {
      slideFirst = 0;
    } else {
      slideFirst++;
    }

    petsCont.ontransitionend = null;
  };
});

slideLeft.addEventListener("click", function () {
  petsCont.classList.add("slides-trans");
  petsCont.style.left = 20 + "px";
  petsCont.ontransitionend = function () {
    petsCont.classList.remove("slides-trans");
    petsCont.style.left = -460 + "px";
    if (slideFirst === 0) {
      slideLast = 7;
    } else {
      slideLast = slideFirst - 1;
    }
    sliders[slideFirst].before(sliders[slideLast]);
    sliders[slideFirst + 8].before(sliders[slideLast + 8]);

    if (slideFirst === 0) {
      slideFirst = 7;
    } else {
      slideFirst--;
    }

    petsCont.ontransitionend = null;
  };
});

// Feedback //////////////////////////////////////////////////////////////////////

const feedback = document.querySelector(".feedback__blocks-cont");
const feedbackItem = document.querySelectorAll(".feedback__blocks_block");
const feedbackArrs = document.querySelectorAll(".feedback__arr");

let firstFeedback = 0;
let lastFeedback;

const feedbackMove = function () {
  feedback.classList.add("feedback-trans");
  feedback.style.left = -1090 + "px";
  feedback.ontransitionend = function () {
    feedback.classList.remove("feedback-trans");
    feedback.style.left = -545 + "px";
    if (firstFeedback === 0) {
      lastFeedback = 3;
    } else {
      lastFeedback = firstFeedback - 1;
    }

    feedbackItem[lastFeedback].after(feedbackItem[firstFeedback]);
    feedbackItem[lastFeedback + 4].after(feedbackItem[firstFeedback + 4]);

    if (firstFeedback === 3) {
      firstFeedback = 0;
    } else {
      firstFeedback++;
    }

    feedback.ontransitionend = null;
  };
};

const feedbackMoveLeft = function () {
  feedback.classList.add("feedback-trans");
  feedback.style.left = 0 + "px";
  feedback.ontransitionend = function () {
    feedback.classList.remove("feedback-trans");
    feedback.style.left = -545 + "px";
    if (firstFeedback === 0) {
      lastFeedback = 3;
    } else {
      lastFeedback = firstFeedback - 1;
    }

    feedbackItem[firstFeedback].before(feedbackItem[lastFeedback]);
    feedbackItem[firstFeedback + 4].before(feedbackItem[lastFeedback + 4]);

    if (firstFeedback === 0) {
      firstFeedback = 3;
    } else {
      firstFeedback--;
    }

    feedback.ontransitionend = null;
  };
};

let feedbackInterval = setInterval(feedbackMove, 15000);

feedbackItem.forEach(
  (item) =>
    (item.onclick = function () {
      clearInterval(feedbackInterval);
      setTimeout(function () {
        feedbackInterval = setInterval(feedbackMove, 15000);
      }, 45000);
      item.onclick = null;
    })
);

let timeoutDelay = null;

feedbackArrs.forEach(
  (item) =>
    (item.onclick = function () {
      clearTimeout(timeoutDelay);
      if (item.classList.contains("feedback__right-arr")) {
        feedbackMove();
      }
      if (item.classList.contains("feedback__left-arr")) {
        feedbackMoveLeft();
      }
      clearInterval(feedbackInterval);
      feedbackInterval = null;
      timeoutDelay = setTimeout(function () {
        clearInterval(feedbackInterval);
        feedbackInterval = null;
        feedbackInterval = setInterval(feedbackMove, 15000);
      }, 45000);
    })
);
