import {
  DOMString,
  getInput,
  addListItem,
  clearFields,
  displayBudgetUi,
  deleteItemUI,
  displayPercentage,
  getDate,
  changeType
} from "./uiController";
import {
  addItem,
  calculateBudget,
  deleteItem,
  calculatePercentage,
  getPercentage
} from "./budgetController";

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

  //When Application start the whole Budget UI is set to 0
  displayBudgetUi({
    totalIncome: 0,
    totalExpenses: 0,
    percentage: "-",
    budget: "0"
  });

  document
    .querySelector(DOMString.inputType)
    .addEventListener("change", changeType);
  // display Dtae on the UI WHEN Application first start
  getDate();
  document
    .querySelector(".container")
    .addEventListener("click", ctrlDeleteItem);
};

const updateBudget = () => {
  //return total income,expenses,budget and percentage
  const budget = calculateBudget();
  displayBudgetUi(budget);
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

    // update budget
    updateBudget();

    // calculate and get percentage
    updatePercentage();
  }
}

const ctrlDeleteItem = event => {
  const item = event.target.parentNode.parentNode.parentNode.parentNode.id;

  if (item) {
    const [type, id] = item.split("-");

    //Delete Item from data structure
    deleteItem(type, id);
    //delete Item  from UI
    deleteItemUI(item);
    //Recalculate and show Budget
    updateBudget();
    // calculate and get percentage
    updatePercentage();
  }
};

const updatePercentage = () => {
  calculatePercentage();
  const percentages = getPercentage();
  displayPercentage(percentages);
};
