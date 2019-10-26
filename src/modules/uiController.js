export const DOMString = {
  inputType: ".add__type",
  inputDescription: ".add__description",
  inputValue: ".add__value",
  inputBtn: ".add__btn"
};

export const getInput = function() {
  return {
    type: document.querySelector(DOMString.inputType).value,
    description: document.querySelector(DOMString.inputDescription).value,
    value: document.querySelector(DOMString.inputValue).value
  };
};

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
    element = ".income__list";
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

    element = ".expenses__list";
  }

  document.querySelector(element).insertAdjacentHTML("afterbegin", html);
};
