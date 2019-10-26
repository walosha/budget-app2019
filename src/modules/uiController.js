import { func } from "prop-types";

export const DOMString = {
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputBtn: ".add__btn",
  incomeContainer: ".income__list",
  expensesContainer: ".expenses__list"
};

export const getInput = function() {
  return {
    type: document.querySelector(DOMString.inputType).value,
    description: document.querySelector(DOMString.inputDescription).value,
    value: document.querySelector(DOMString.inputValue).value
  };
};

//  Adding a New Item to the UI
export const addListItem = function(obj, type) {
  let html, element;
  if (type === "inc") {
    html = `<div class="item clearfix" id="income-${obj.id}">
                              <div class="item__description">${obj.description}</div>
                              <div class="right clearfix">
                                  <div class="item__value">${obj.value}</div>
                                  <div class="item__delete">
                                      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                  </div>
                              </div>
                          </div>`;
    element = DOMString.incomeContainer;
  } else {
    html = `<div class="item clearfix" id="expense-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">-${obj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

    element = DOMString.expensesContainer;
  }

  document.querySelector(element).insertAdjacentHTML("afterbegin", html);
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
