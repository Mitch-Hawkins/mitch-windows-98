const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", () => {
  const startMenu = document.querySelector("#startMenu");
  toggleStart(startMenu);
});

function toggleStart(startMenu) {
  if (startMenu == null) return;
  startMenu.classList.toggle("start__active");
  startButton.classList.toggle("nav__start__active");
}
