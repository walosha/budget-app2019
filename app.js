//BUDGET CONTROLLER

var budgetContoller = (function() {
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  calculateTotals = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  return {
    addNewItems: function(type, description, value) {
      var newItems, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "inc") {
        newItems = new Income(ID, description, value);
      } else if (type === "exp") {
        newItems = new Expenses(ID, description, value);
      }
      // Push into Data Structure
      data.allItems[type].push(newItems);
      // Return New Element
      return newItems;
    },

    calculateBudget: function() {
      // calculate total Income and Expenses

      calculateTotals("inc");
      calculateTotals("exp");

      // 2. calculate Budget Balance

      data.budget = data.totals.inc - data.totals.exp;

      // 2. calculate Percentage of Expenses on Income

      if (data.totalIncome > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        budget: data.budget,
        percentage: data.percentage
      };
    },

    testing: function() {
      console.log(data);
    }
  };

  budgetContoller.testing();
})();

//UI CONTROLLER

var uiContoller = (function() {
  var domStrings = {
    inputType: ".add__type",
    addDescription: ".add__description",
    addValue: ".add__value",
    addButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    budgetIncomeLabel: ".budget__income--value",
    budgetExpensesLabel: ".budget__expenses--value",
    budgetPercentageLabel: ".budget__expenses--percentage",
    budgetMonth: ".budget__title--month"
  };
https://github.com/walosha/budget-app2019.git
  return {
    domStrings: function() {
      return domStrings;
    },

    getInput: function() {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.addDescription).value,
        value: parseFloat(document.querySelector(domStrings.addValue).value)
      };
    },

    displayBudget: function(obj) {
      document.querySelector(domStrings.budgetLabel).textContent =
        obj.budgetLabel;
      document.querySelector(domStrings.budgetIncomeLabel).textContent =
        obj.totalIncome;
      document.querySelector(domStrings.budgetExpensesLabel).textContent =
        obj.totalExpenses;

      if (obj.percentage > 0) {
        document.querySelector(domStrings.budgetPercentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(domStrings.budgetPercentageLabel).textContent =
          "---";
      }
    },

    addItemList: function(obj, type) {
      var html, newHtml, element;
      // 1. Add Html with placeholder text
      if (type === "inc") {
        element = domStrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>
                        <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === "exp") {
        element = domStrings.expensesContainer;
        html = `<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div>
                        <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>
                        <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div></div></div>`;
      }

      // 2. replace Place with actual text

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // 3. Insert Html to the DOM.

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      var field, fieldArr;

      field = document.querySelectorAll(
        domStrings.addDescription + "," + domStrings.addValue
      );

      fieldArr = Array.prototype.slice.call(field);

      fieldArr.forEach(function(cur, index, array) {
        cur.value = "";
      });

      fieldArr[0].focus();
    }
  };
})();

//APP CONTROLLER

var appContoller = (function(budgetCtrl, uicontrl) {
  var dom = uiContoller.domStrings();

  var setUpEventsListners = function() {
    document
      .querySelector(dom.addButton)
      .addEventListener("click", contrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        contrlAddItem();
      }
    });
  };

  // SETTING BUDET MONTH

  const budgetMonth = dom.budgetMonth;
  document.querySelector(budgetMonth).textContent = new Date().toLocaleString(
    "en-us",
    { month: "long" }
  );

  var updateBudget = function() {
    budgetContoller.calculateBudget();

    var budget = budgetContoller.getBudget();

    // Display Budget To The User Interface

    uiContoller.displayBudget(budget);
  };

  var contrlAddItem = function() {
    var input, newItems;

    // 1. Get Input data
    input = uiContoller.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add items to Budget Controller
      newItems = budgetContoller.addNewItems(
        input.type,
        input.description,
        input.value
      );

      //3. Add items to the UI

      uiContoller.addItemList(newItems, input.type);

      //4. Clear Input fields

      uiContoller.clearFields();

      //5. Calculate and Update Budget

      updateBudget();
    }
  };

  return {
    init: function() {
      setUpEventsListners();
      console.log("Application has started");
    }
  };
})(uiContoller, budgetContoller);

appContoller.init();
