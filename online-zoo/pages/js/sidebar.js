const swipe = document.querySelectorAll(".side-bar__footer");
const main = document.querySelectorAll(".side-bar__main");
const items = document.querySelectorAll(".item__prev");
const itemsOpen = document.querySelectorAll(".item__next");
const unactive = document.querySelectorAll(".item__unactive");

unactive.forEach((item) =>
  item.addEventListener("click", (e) => e.preventDefault())
);

let last = 7;
let curr;

let shift = 170;

main.forEach((m) => (m.style.top = 1 + "px"));

swipe.forEach((s) =>
  s.addEventListener(
    "click",
    function () {
      main.forEach((m) => (m.style.top = -shift + "px"));
      main.forEach((m) => m.classList.add("side-bar__main_trans"));
      main.forEach(
        (m) =>
          (m.ontransitionend = function () {
            main.forEach((m) => m.classList.remove("side-bar__main_trans"));
            main.forEach((m) => (m.style.top = 1 + "px"));

            if (last < 7) {
              curr = last + 1;
            } else {
              curr = 0;
            }
            items[last].after(items[curr]);
            itemsOpen[last].after(itemsOpen[curr]);
            if (last < 7) {
              last++;
            } else {
              last = 0;
            }
            main.forEach((m) => (m.ontransitionend = null));
          })
      );
    },
    true
  )
);

const mediaQueryHigh = window.matchMedia("(min-width: 1041px)");

function handleTabletChangeHigh(e) {
  if (e.matches) {
    shift = 170;
  }
}

mediaQueryHigh.addListener(handleTabletChangeHigh);
handleTabletChangeHigh(mediaQueryHigh);

const mediaQuery = window.matchMedia("(max-width: 1040px)");

function handleTabletChange(e) {
  if (e.matches) {
    shift = 100;
  }
}

mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);

const mediaQueryLow = window.matchMedia("(max-width: 590px)");

function handleTabletChangeLow(e) {
  if (e.matches) {
    shift = 50;
  }
}

mediaQueryLow.addListener(handleTabletChangeLow);
handleTabletChangeLow(mediaQueryLow);
