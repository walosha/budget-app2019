import { func } from "prop-types";

export const DOMString = {
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputBtn: ".add__btn",
  incomeContainer: ".income__list",
  expensesContainer: ".expenses__list",
  totalBudget: ".budget__value",
  totalIncome: ".budget__income--value",
  totalExpenses: ".budget__expenses--value",
  totalExpensesPerctage: ".budget__expenses--percentage",
  percentageLable: ".item__percentage",
  dateLabel: ".budget__title--month"
};

export const getInput = function() {
  return {
    type: document.querySelector(DOMString.inputType).value,
    description: document.querySelector(DOMString.inputDescription).value,
    value: parseFloat(document.querySelector(DOMString.inputValue).value)
  };
};

//  Adding a New Item to the UI
export const addListItem = function(obj, type) {
  let html, element;
  if (type === "inc") {
    html = `<div class="item clearfix" id="inc-${obj.id}">
                              <div class="item__description">${
                                obj.description
                              }</div>
                              <div class="right clearfix">
                                  <div class="item__value">${formatNumber(
                                    obj.value,
                                    "inc"
                                  )}</div>
                                  <div class="item__delete">
                                      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                  </div>
                              </div>
                          </div>`;
    element = DOMString.incomeContainer;
  } else {
    html = `<div class="item clearfix" id="exp-${obj.id}">
                            <div class="item__description">${
                              obj.description
                            }</div>
                            <div class="right clearfix">
                                <div class="item__value">${formatNumber(
                                  obj.value,
                                  "exp"
                                )}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

    element = DOMString.expensesContainer;
  }

  document.querySelector(element).insertAdjacentHTML("beforeend", html);
};

export const clearFields = function() {
  const fields = document.querySelectorAll(
    DOMString.inputDescription + "," + DOMString.inputValue
  );
  fields.forEach(field => {
    field.value = "";
  });
  //setting focus on first input
  fields[0].focus();
};

export const displayBudgetUi = obj => {
  document.querySelector(DOMString.totalBudget).textContent = obj.budget;

  if (obj.budget > 0) {
    document.querySelector(DOMString.totalBudget).textContent = formatNumber(
      obj.budget,
      "inc"
    );
  }

  document.querySelector(DOMString.totalIncome).textContent = formatNumber(
    obj.totalIncome,
    "inc"
  );
  document.querySelector(DOMString.totalExpenses).textContent = formatNumber(
    obj.totalExpenses,
    "exp"
  );
  if (obj.percentage < 1) {
    document.querySelector(DOMString.totalExpensesPerctage).textContent = "---";
  } else {
    document.querySelector(DOMString.totalExpensesPerctage).textContent =
      obj.percentage;
  }
};

export const deleteItemUI = selectID => {
  // Removing element from the DOM
  document
    .querySelector(`#${selectID}`)
    .parentNode.removeChild(document.querySelector(`#${selectID}`));
};

export const displayPercentage = percentages => {
  const nodeList = document.querySelectorAll(DOMString.percentageLable);
  nodeList.forEach((node, index) => {
    node.textContent = percentages[index];
  });
};

function formatNumber(num, type) {
  num = num.toFixed(2);
  num = num.split(".");
  let [int, dec] = num;
  int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
  return type === "inc" ? "+" + int + "." + dec : "-" + int + "." + dec;
}

export function getDate() {
  const now = new Date().toLocaleString("eng", {
    year: "numeric",
    month: "long"
  });
  document.querySelector(DOMString.dateLabel).textContent = now;
}

export const changeType = function() {
  const nodeList = document.querySelectorAll(
    DOMString.inputType +
      "," +
      DOMString.inputDescription +
      "," +
      DOMString.inputValue
  );
  nodeList.forEach(node => {
    node.classList.toggle("red-focus");
  });
};
