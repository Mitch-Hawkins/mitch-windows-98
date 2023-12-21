//====DEFINING GLOBAL VARIABLES====================================================================

const startButton = document.querySelector("#startButton");
const shortcutArticle = document.querySelectorAll(".desktop__article");
const closeButton = document.querySelectorAll(
  ".desktop__modal__header__button"
);
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
  addProgramToBar(window.id.substring(6, window.id.length), programTitle);
  console.log(window.id);
}

function addProgramToBar(cls, programTitle) {
  const newElement = document.createElement("button");
  const parentNode = navBar;

  newElement.classList.add("nav__program__button");

  newElement.classList.add(cls);

  const newText = document.createTextNode(programTitle);

  newElement.appendChild(newText);

  parentNode.appendChild(newElement);
}
//====CLOSE MODAL FUNCTIONALITY=================================================================

closeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".desktop__modal");
    let prog;

    // const progArr = Array.from(
    //   document.getElementsByClassName("nav__program__button")
    // );

    // const progList = document.getElementsByClassName("nav__program__button");
    const progList = navBar.querySelectorAll(
      `.${modal.id.substring(6, modal.id.length)}`
    );
    console.log(progList);
    console.log(modal.id);

    progList.forEach((program) => {
      if (program.classList.contains(modal.id.substring(6, modal.id.length))) {
        prog = program;
      }
    });

    closeWindow(modal);
    removeProgramFromBar(prog);
  });
});

function removeProgramFromBar(programElement) {
  programElement.remove();
}

function closeWindow(modal) {
  if (modal == null) return;
  modal.classList.remove("modal__open");
}

//====DRAGGABLE MODAL FUNCTIONALITY=============================================================

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
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    // e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
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
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
