import { DOMString, getString } from "./uiController";
import { addItem } from "./budgetController";

export const setupEventListener = function() {
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
};

function ctrlAddItems() {
  const input = getString();
  const newItem = addItem(input);
  console.log(newItem);
}
