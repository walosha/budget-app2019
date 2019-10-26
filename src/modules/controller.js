import { DOMString, getInput, addListItem, clearFields } from "./uiController";
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
  const input = getInput();
  const newItem = addItem(input);
  addListItem(newItem, input.type);
  clearFields();
}
