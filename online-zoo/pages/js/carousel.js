let collectSlides = document.querySelectorAll(".pet-slide");
const slideContainer = document.querySelector(".pets-slides");

let sliderWidth = 440;
let sliderOffset = 40;
let measure = "px";

let slider = [];

for (let i = 0; i < collectSlides.length; i++) {
  slider.push(collectSlides[i]);
  collectSlides[i].remove();
}

let step = slider.length - 1;
let stepRight = 0;

function findStepRight() {
  stepRight = step - 6;
  if (stepRight < 0) {
    stepRight = slider.length + stepRight;
  }
}

function findStep() {
  step = stepRight + 6;
  if (step > slider.length - 1) {
    step = step - slider.length;
  }
}

let offset = 0;

function draw() {
  let slide = document.createElement("div");
  slide.classList.add("pet-sl", "transiter");

  slide.insertAdjacentElement("afterbegin", slider[step]);
  slide.style.left =
    -sliderWidth - sliderOffset + offset * sliderOffset + measure;
  slideContainer.append(slide);
  if (step + 1 == slider.length) {
    step = 0;
  } else {
    step++;
  }

  findStepRight();

  if (offset == 4) {
    offset = 0;
  } else {
    offset++;
  }
}

function drawRight() {
  let slide = document.createElement("div");
  slide.classList.add("pet-sl");

  slide.insertAdjacentElement("afterbegin", slider[stepRight]);
  slide.style.left = offset * sliderOffset + measure;

  slideContainer.prepend(slide);
  if (stepRight == 0) {
    stepRight = slider.length - 1;
  } else {
    stepRight--;
  }

  findStep();

  if (offset == 4) {
    offset = 0;
  } else {
    offset++;
  }
}

function moveLeft() {
  document.querySelector(".pet-mod-right").onclick = null;
  document.querySelector(".pet-mod-left").onclick = null;
  let slides2 = document.querySelectorAll(".pet-sl");
  let offset2 = 0;
  for (let i = 0; i < slides2.length; i++) {
    slides2[i].style.left =
      (-sliderWidth - sliderOffset) * 2 + offset2 * sliderOffset + measure;
    offset2++;
  }
  draw();

  let slides3 = document.querySelectorAll(".pet-sl");
  slides3[0].addEventListener("transitionend", function () {
    slides3.forEach(function (slide) {
      slide.classList.remove("transiter");
    });
    slides3[0].remove();
    offset3 = 0;
    for (let i = 0; i < slides3.length; i++) {
      if (i === 1) {
        slides3[i].style.left =
          -sliderWidth - sliderOffset + offset3 * sliderOffset + measure;
      } else {
        slides3[i].style.left =
          -sliderWidth - sliderOffset + offset3 * sliderOffset + measure;
        offset3++;
      }
    }

    setTimeout(function () {
      slides3.forEach(function (slide) {
        slide.classList.add("transiter");
      });
      document.querySelector(".pet-mod-right").onclick = moveLeft;
      document.querySelector(".pet-mod-left").onclick = moveRight;
    }, 100);
  });
}

function moveRight() {
  document.querySelector(".pet-mod-right").onclick = null;
  document.querySelector(".pet-mod-left").onclick = null;
  let slides2 = document.querySelectorAll(".pet-sl");
  slides2[slides2.length - 1].remove();
  let offset2 = 0;
  for (let i = 0; i < slides2.length; i++) {
    slides2[i].style.left = offset2 * sliderOffset + measure;
    offset2++;
  }

  slides2[0].addEventListener(
    "transitionend",
    function () {
      slides2.forEach(function (slide) {
        slide.classList.remove("transiter");
      });
      drawRight();

      let slides3 = document.querySelectorAll(".pet-sl");

      offset3 = 0;
      for (let i = 0; i < slides3.length; i++) {
        slides3[i].style.left =
          -sliderWidth - sliderOffset + offset3 * sliderOffset + measure;
        offset3++;
      }

      setTimeout(function () {
        slides3.forEach(function (slide) {
          slide.classList.add("transiter");
        });
        document.querySelector(".pet-mod-right").onclick = moveLeft;
        document.querySelector(".pet-mod-left").onclick = moveRight;
      }, 100);
    },
    { once: true }
  );
}

//////Количество вызовов
draw();
draw();
draw();
draw();
draw();

document.querySelector(".pet-mod-left").onclick = moveRight;
document.querySelector(".pet-mod-right").onclick = moveLeft;

///////////MEDIA
const mediaQueryHigh = window.matchMedia("(min-width: 1401px)");
function handleTabletChangeHigh(e) {
  if (e.matches) {
    sliderWidth = 440;
    sliderOffset = 40;
    measure = "px";

    step = step - 5;
    if (step < 0) {
      step = slider.length + step;
    }

    findStepRight();

    offset = 0;

    let collectSlidesMedia = document.querySelectorAll(".pet-sl");

    for (let i = 0; i < collectSlidesMedia.length; i++) {
      collectSlidesMedia[i].remove();
    }

    draw();
    draw();
    draw();
    draw();
    draw();
  }
}
mediaQueryHigh.addListener(handleTabletChangeHigh);
handleTabletChangeHigh(mediaQueryHigh);

const mediaQueryS = window.matchMedia(
  "(max-width: 1400px) and (min-width: 951px)"
);
function handleTabletChangeS(e) {
  if (e.matches) {
    sliderWidth = 455;
    sliderOffset = 20;
    measure = "px";

    step = step - 5;
    if (step < 0) {
      step = slider.length + step;
    }

    findStepRight();

    offset = 0;

    let collectSlidesMedia = document.querySelectorAll(".pet-sl");

    for (let i = 0; i < collectSlidesMedia.length; i++) {
      collectSlidesMedia[i].remove();
    }

    draw();
    draw();
    draw();
    draw();
    draw();
  }
}
mediaQueryS.addListener(handleTabletChangeS);
handleTabletChangeS(mediaQueryS);

const mediaQueryL = window.matchMedia(
  "(max-width: 950px) and (min-width: 601px)"
);
function handleTabletChangeL(e) {
  console.log(e);
  if (e.matches) {
    sliderWidth = 290;
    sliderOffset = 20;
    measure = "px";

    step = step - 5;
    if (step < 0) {
      step = slider.length + step;
    }

    offset = 0;

    findStepRight();

    let collectSlidesMedia = document.querySelectorAll(".pet-sl");

    for (let i = 0; i < collectSlidesMedia.length; i++) {
      collectSlidesMedia[i].remove();
    }

    draw();
    draw();
    draw();
    draw();
    draw();
  }
}
mediaQueryL.addListener(handleTabletChangeL);
handleTabletChangeL(mediaQueryL);

const mediaQueryLow = window.matchMedia("(max-width: 600px)");
function handleTabletChangeLow(e) {
  if (e.matches) {
    sliderWidth = 300;
    sliderOffset = 0;
    measure = "px";

    step = step - 5;
    if (step < 0) {
      step = slider.length + step;
    }

    offset = 0;

    findStepRight();

    let collectSlidesMedia = document.querySelectorAll(".pet-sl");

    for (let i = 0; i < collectSlidesMedia.length; i++) {
      collectSlidesMedia[i].remove();
    }

    draw();
    draw();
    draw();
    draw();
    draw();
  }
}
mediaQueryLow.addListener(handleTabletChangeLow);
handleTabletChangeLow(mediaQueryLow);
/////////////
