const opening = document.querySelector(".side-bar__opening");
const closing = document.querySelector(".side-bar__closing");
const sidePrev = document.querySelector(".side-bar__prev");
const sideOpened = document.querySelector(".side-open");
const par = document.querySelectorAll(".main_item_par");

opening.addEventListener("click", function () {
  sidePrev.classList.add("hiden-block");
  sideOpened.classList.add("side-open_active");
  setTimeout(
    par.forEach(function (p) {
      par.forEach((p) => (p.style.color = "#fff"));
      p.classList.add("hiden-par");
      sidePrev.style.display = "none";
    }),
    1500
  );
});

closing.addEventListener("click", function () {
  par.forEach((p) => (p.style.color = "transparent"));
  par.forEach((p) => p.classList.remove("hiden-par"));
  sidePrev.style.display = "block";

  sideOpened.classList.remove("side-open_active");
  setTimeout(function () {
    sidePrev.classList.remove("hiden-block");
  }, 500);
});

// videos carousel///////////////////////////////////////////
const arrLeft = document.querySelector(".cams__other_left");
const arrRight = document.querySelector(".cams__other_right");
const vidoesCont = document.querySelector(".other-videos__container");
const itemsOther = document.querySelectorAll(".cams__other_item");

let currOther = 0;
let lastOther;

let othersCoef = -360;

vidoesCont.style.left = othersCoef + "px";

arrRight.addEventListener("click", function () {
  vidoesCont.classList.add("other-videos_transition");
  vidoesCont.style.left = othersCoef * 2 + "px";
  vidoesCont.ontransitionend = function () {
    vidoesCont.classList.remove("other-videos_transition");
    vidoesCont.style.left = othersCoef + "px";
    if (currOther === 0) {
      lastOther = 6;
    } else {
      lastOther = currOther - 1;
    }

    itemsOther[lastOther].after(itemsOther[currOther]);

    if (currOther === 6) {
      currOther = 0;
    } else {
      currOther++;
    }

    vidoesCont.ontransitionend = null;
  };
});

arrLeft.addEventListener("click", function () {
  vidoesCont.classList.add("other-videos_transition");
  vidoesCont.style.left = 0 + "px";
  vidoesCont.ontransitionend = function () {
    vidoesCont.classList.remove("other-videos_transition");
    vidoesCont.style.left = othersCoef + "px";
    if (currOther === 0) {
      lastOther = 6;
    } else {
      lastOther = currOther - 1;
    }

    itemsOther[currOther].before(itemsOther[lastOther]);

    if (currOther === 0) {
      currOther = 6;
    } else {
      currOther--;
    }

    vidoesCont.ontransitionend = null;
  };
});

const mediaQueryBig = window.matchMedia("(min-width: 1651px)");

function handleTabletChangeBig(e) {
  if (e.matches) {
    othersCoef = -360;
    vidoesCont.style.left = othersCoef + "px";
  }
}

mediaQueryBig.addListener(handleTabletChangeBig);
handleTabletChangeBig(mediaQueryBig);

const mediaQueryMedium = window.matchMedia(
  "(max-width: 1650px) and (min-width: 1181px)"
);

function handleTabletChangeMedium(e) {
  if (e.matches) {
    othersCoef = -285;
    vidoesCont.style.left = othersCoef + "px";
  }
}

mediaQueryMedium.addListener(handleTabletChangeMedium);
handleTabletChangeMedium(mediaQueryMedium);

const mediaQueryM = window.matchMedia(
  "(max-width: 1180px) and (min-width: 591px)"
);

function handleTabletChangeM(e) {
  if (e.matches) {
    othersCoef = -155;
    vidoesCont.style.left = othersCoef + "px";
  }
}

mediaQueryM.addListener(handleTabletChangeM);
handleTabletChangeM(mediaQueryM);

const mediaQueryL = window.matchMedia("(max-width: 590px)");

function handleTabletChangeL(e) {
  if (e.matches) {
    othersCoef = -160;
    vidoesCont.style.left = othersCoef + "px";
  }
}

mediaQueryL.addListener(handleTabletChangeL);
handleTabletChangeL(mediaQueryL);

const mainFrame = document.querySelector(".main__iframe");
const otherFrames = document.querySelectorAll(".cams__frame");
const otherWrappers = document.querySelectorAll(".cams__other_wrapper");
const mainWrapper = document.querySelector(".main-video__wrapper");

mainWrapper.addEventListener("mouseenter", function () {
  mainWrapper.classList.add("pointer-none");
});

mainWrapper.addEventListener("mouseleave", function () {
  mainWrapper.classList.remove("pointer-none");
});

itemsOther.forEach((item) =>
  item.addEventListener("click", function () {
    let changer = mainFrame.src;
    mainFrame.src = item.querySelector(".cams__frame").src;
    item.querySelector(".cams__frame").src = changer;
  })
);
