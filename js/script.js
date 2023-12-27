//====DEFINING GLOBAL VARIABLES====================================================================

const startButton = document.querySelector("#startButton");
const shortcutArticle = document.querySelectorAll(".desktop__article");
const modalShortcutArticle = document.querySelectorAll(
  ".desktop__modal__content__article"
);
const closeButton = document.querySelectorAll(
  ".desktop__modal__header__button"
);
const navBar = document.querySelector("#program-bar");

const desktopModal = document.querySelectorAll(".desktop__modal");
const desktopModalHeader = document.querySelectorAll(".desktop__modal__header");

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

shortcutArticle.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("desktop__article__icon--active");
  });
  icon.addEventListener("blur", () => {
    icon.classList.remove("desktop__article__icon--active");
  });
  icon.addEventListener("dblclick", () => {
    const window = document.querySelector(`#modal-${icon.id}`);
    const windowHeader = document.querySelector(`#modal-${icon.id}header`);
    openWindow(window, windowHeader);
    icon.classList.remove("desktop__article__icon--active");
  });
});

function openWindow(window, windowHeader) {
  if (window == null) return;
  if (window.classList.contains("modal__open")) return;

  window.classList.add("modal__open"); //make the modal visible
  window.classList.add("desktop__modal__header--active");
  str = window.id
    .substring(6, window.id.length)
    .split(/(?=[A-Z])/)
    .join(" "); //takes the id tag of the modal, removes the "modal-" from it, splits into words via camel casing reg ex, and formats it with Capital first letters to be displayed as a title (eg: modal-recycleBin -> recycle, Bin, recycle Bin)
  programTitle = str[0].toUpperCase() + str.slice(1); //makes first letter capital
  addProgramToBar(window.id.substring(6, window.id.length), programTitle);
  console.log(window.id); //for Debugging
}

function addProgramToBar(cls, programTitle) {
  const newElement = document.createElement("button"); //creates a new button HTML element
  const parentNode = navBar; //makes the parent Node/Element of the new button the navBar
  newElement.classList.add("nav__program__button"); //gives it the styling of a nav program button by adding the class

  newElement.classList.add("nav__program__button--active");
  newElement.setAttribute("tabindex", "-1");

  newElement.classList.add(cls); //adds the id of the corresponding modal to the program buttons class list
  const newText = document.createTextNode(programTitle); //creates the text to be put inbetween the html tags to be displayed as the buttons label.

  newElement.addEventListener("click", () => {
    if (newElement == null) return;
    newElement.classList.add("nav__program__button--active");
    newElement.focus(); //Problem Lies Here
    console.log("Focus is on Program Bar");
    const elementModal = document.querySelector(`#modal-${cls}`);
    console.log(elementModal);
    elementModal.classList.add("desktop__modal__header--active");
    elementModal.style.zIndex += 1;
  });
  newElement.addEventListener("blur", () => {
    if (newElement == null) return;
    newElement.classList.remove("nav__program__button--active");
    console.log("Focus has left Program Bar");
    const elementModal = document.querySelector(`#modal-${cls}`);
    elementModal.classList.remove("desktop__modal__header--active"); //is the initial drag and drop problemc
    elementModal.style.zIndex = 0;
  });

  newElement.appendChild(newText); //puts the newly created text inbetween the new buttons html tags
  parentNode.appendChild(newElement); //creates the new button as a child of the navBar element

  newElement.click(); //Why Did I need...
  console.log(newElement);
}

//====CLOSE MODAL FUNCTIONALITY=================================================================

closeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".desktop__modal"); //gets the HTML element of the modal that is the parent of the close button that was just clicked

    let prog; //initialising a blank variable that will eventually be set to the program bar button HTML element that will be removed from the program bar

    const progList = navBar.querySelectorAll(".nav__program__button"); //creates a NodeList of all the progrma buttons in the nav bar

    progList.forEach((program) => {
      if (program.classList.contains(modal.id.substring(6, modal.id.length))) {
        prog = program;
      }
    }); //Loops through the NodeList and if the HTML element in the list contains the modals id in its classList, then the prog variable now is set to that HTML element.

    closeWindow(modal); //passes through the modal to be closed (have the modal__open class removed)
    removeProgramFromBar(prog); //passes through the program bar button HTML element to be removed with remove()
  });
});

function removeProgramFromBar(programElement) {
  programElement.remove();
}

function closeWindow(modal) {
  if (modal == null) return;
  modal.classList.remove("modal__open");
}

//====MODAL HEADER FOCUS FUNCTIONALITY==========================================================
desktopModal.forEach((modal) => {
  modal.addEventListener("click", () => {
    modal.classList.add("desktop__modal__header--active");
    modal.style.zIndex += 1;
    console.log("Focus is on Modal");
    const modalProgramBar = document.querySelector(
      `.${modal.id.substring(6, modal.id.length)}`
    );
    if (modalProgramBar != null) {
      modalProgramBar.classList.add("nav__program__button--active");
    }
  });
  modal.addEventListener("blur", () => {
    modal.classList.remove("desktop__modal__header--active");
    modal.style.zIndex = 0;
    console.log("Focus has left Modal");
    const modalProgramBar = document.querySelector(
      `.${modal.id.substring(6, modal.id.length)}`
    );
    modalProgramBar.classList.remove("nav__program__button--active");
  });
  modal.click();
});

//====DRAGGABLE MODAL FUNCTIONALITY=============================================================

dragElement(document.getElementById("modal-myComputer"));
dragElement(document.getElementById("modal-fileExplorer"));
dragElement(document.getElementById("modal-recycleBin"));
dragElement(document.getElementById("modal-internetExplorer"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // e.preventDefault();
    // calculate the new cursor position:
    console.log("Mouse Down");
    elmnt.classList.add("desktop__modal__header--active");
    elmnt.style.zIndex = 1;
    console.log(elmnt.style.zIndex);
    const elmntProgramBar = document.querySelector(
      `.${elmnt.id.substring(6, elmnt.id.length)}`
    );
    elmntProgramBar.classList.add("nav__program__button--active");
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    console.log("Mouse Up");
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
