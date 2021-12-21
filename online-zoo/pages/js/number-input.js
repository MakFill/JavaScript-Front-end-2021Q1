const numInput = document.querySelector(".number-input");
const inputBtn = document.querySelector(".union-img");

numInput.addEventListener("input", function (e) {
  if (numInput.value == "") {
    numInput.value = "";
  }

  if (numInput.value.toString().length > 4) {
    numInput.value = numInput.value.toString().slice(0, -1);
  }
});

inputBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

document
  .querySelectorAll(".prevent-default")
  .forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
