import { DOMString, getString } from "./uiController";

document.addEventListener("keypress", function(e) {
  if (e.keyCode === 13 || e.which === 13) {
    ctrlAddItems();
  }
});

document
  .querySelector(DOMString.inputBtn)
  .addEventListener("click", function(e) {
    ctrlAddItems();
  });

function ctrlAddItems() {
  console.log(getString());
}
