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
  // read Input from UI
  const input = getInput();

  if (input.value !== "" && !isNaN(input.value) && input.value > 0) {
    // Store data into the model
    const newItem = addItem(input);

    // addItem to the UI && DOM
    addListItem(newItem, input.type);

    //Clear input fields afetr reading it
    clearFields();
  }
}
