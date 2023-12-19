const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", () => {
  const startMenu = document.querySelector("#startMenu");
  toggleStart(startMenu);
});

startButton.addEventListener("blur", () => {
  const startMenu = document.querySelector("#startMenu");
  removeStart(startMenu);
});

function toggleStart(startMenu) {
  if (startMenu == null) return;
  startMenu.classList.toggle("start__active");
  startButton.classList.toggle("nav__start__active");
}

function removeStart(startMenu) {
  if (startMenu == null) return;
  startMenu.classList.remove("start__active");
  startButton.classList.remove("nav__start__active");
}
