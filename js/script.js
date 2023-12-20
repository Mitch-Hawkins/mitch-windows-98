//====DEFINING GLOBAL VARIABLES====================================================================

const startButton = document.querySelector("#startButton");
const shortcutArticle = document.querySelectorAll(".desktop__article");
const closeButton = document.querySelector(".desktop__modal__header__button");
const navBar = document.querySelector("#program-bar");

//====START MENU FUNCTIONALITY=====================================================================

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

//====OPEN MODAL FUNCTIONALITY====================================================================

// recycleBinShortcut.addEventListener("dblclick", () => {
//   const recycleBinWindow = document.querySelector("#modal-recyclebin");
//   openRecycleBin(recycleBinWindow);
//   recycleBinShortcut.classList.remove("desktop__article__icon--active");
// });

// function openRecycleBin(recycleBinWindow) {
//   if (recycleBinWindow == null) return;
//   if (recycleBinWindow.classList.contains("modal__open")) return;

//   recycleBinWindow.classList.add("modal__open");
//   addProgramToBar("Recycle Bin", "nav__program__button");
// }
shortcutArticle.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("desktop__article__icon--active");
  });
  icon.addEventListener("blur", () => {
    icon.classList.remove("desktop__article__icon--active");
  });
  icon.addEventListener("dblclick", () => {
    const window = document.querySelector(`#modal-${icon.id}`);
    openWindow(window);
    icon.classList.remove("desktop__article__icon--active");
  });
});

function openWindow(window) {
  if (window == null) return;
  if (window.classList.contains("modal__open")) return;

  window.classList.add("modal__open");
  str = window.id
    .substring(6, window.id.length)
    .split(/(?=[A-Z])/)
    .join(" ");
  programTitle = str[0].toUpperCase() + str.slice(1);
  addProgramToBar("nav__program__button", programTitle);
}

function addProgramToBar(cls, programTitle = "Program") {
  const newElement = document.createElement("button");
  const parentNode = navBar;

  newElement.classList.add(cls);

  const newText = document.createTextNode(programTitle);

  newElement.appendChild(newText);

  parentNode.appendChild(newElement);
}
//====CLOSE MODAL FUNCTIONALITY=================================================================

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
