///////////hamburger/////////////
const burger = document.querySelector(".hamburger");
const closer = document.querySelector(".close-hamburger");
const nav = document.querySelector(".hiden-nav");
const navMain = document.querySelector(".hiden-nav__main");

burger.addEventListener("click", function () {
  nav.classList.add("enable");
  navMain.classList.add("hiden-nav__main-flex");
  closer.classList.add("hiden-nav__main-flex");
});

closer.addEventListener("click", function () {
  nav.classList.remove("enable", "hiden-nav__main-flex");
  navMain.classList.remove("hiden-nav__main-flex");
  closer.classList.remove("hiden-nav__main-flex");
});
