const startButton = document.querySelector("#startButton");

startButton.addEventListener("click", () => {
  const startMenu = document.querySelector("#startMenu");
  openStart(startMenu);
});

function openStart(startMenu) {
  if (startMenu == null) return;
  startMenu.classList.add("start__active");
}

function closeStart(startMenu) {
  if (startMenu == null) return;
  startMenu.classList.remove("start__active");
}
