const startButton = document.querySelector("#startButton");
const recycleBinShortcut = document.querySelector("#recycleBin");

// const openProgram = document.querySelector(".desktop__article");
const closeButton = document.querySelector(".desktop__modal__header__button");

const navBar = document.querySelector("#program-bar");

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

recycleBinShortcut.addEventListener("click", () => {
  const recycleBinWindow = document.querySelector("#modal-recyclebin");
  openRecycleBin(recycleBinWindow);
});

function openRecycleBin(recycleBinWindow) {
  if (recycleBinWindow == null) return;
  if (recycleBinWindow.classList.contains("modal__open")) return;

  recycleBinWindow.classList.add("modal__open");
  // navBar.innterHTML = `<button class="nav__program__button"></button>`;
  addProgramToBar("Recycle Bin", "nav__program__button");
}

function addProgramToBar(programTitle, cls) {
  const newElement = document.createElement("button");
  const parentNode = navBar;

  newElement.classList.add(cls);

  const newText = document.createTextNode(programTitle);

  newElement.appendChild(newText);

  parentNode.appendChild(newElement);
}

closeButton.addEventListener("click", () => {
  const modal = closeButton.closest(".desktop__modal");
  const progNodeList = document.getElementsByClassName("nav__program__button");
  const progBar = Array.from(progNodeList).reduce((acc, node) => acc + node);
  console.log(progBar);
  closeWindow(modal);
  removeProgramFromBar(progBar);
});

function removeProgramFromBar(programElement) {
  programElement.remove();
}

function closeWindow(modal) {
  if (modal == null) return;
  modal.classList.remove("modal__open");
}
