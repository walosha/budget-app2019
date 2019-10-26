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
