class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
  calculatePercentage(totalIncome) {
    this.percentage = Math.round((this.value / totalIncome) * 100);
  }

  getPercentage() {
    return this.percentage;
  }
}
class Income {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}

const data = {
  allItems: {
    inc: [],
    exp: []
  },
  total: {
    inc: 0,
    exp: 0
  },
  budget: 0,
  percentage: -1
};

export function addItem({ type, description, value }) {
  let ID, newItem;

  //check and create and ID for budget type
  if (data.allItems[type].length) {
    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
  } else {
    ID = 0;
  }

  if (type === "inc") {
    newItem = new Income(ID, description, value);
  } else {
    newItem = new Expense(ID, description, value);
  }

  data.allItems[type].push(newItem);
  return newItem;
}

const calculateTotal = function(type) {
  data.total[type] = data.allItems[type].reduce(
    (acc, cur) => acc + cur.value,
    0
  );
};

export const calculateBudget = function() {
  calculateTotal("exp");
  calculateTotal("inc");
  data.budget = data.total["inc"] - data.total["exp"];
  if (data.total["exp"] < data.total["inc"]) {
    data.percentage = Math.round((data.total["exp"] / data.total["inc"]) * 100);
  } else {
    data.percentage = -1;
  }

  return {
    totalIncome: data.total["inc"],
    totalExpenses: data.total["exp"],
    percentage: data.percentage,
    budget: data.budget
  };
};

export const deleteItem = (type, id) => {
  data.allItems[type] = data.allItems[type].filter(item => {
    return item.id != id;
  });

  return data.allItems[type];
};

export const calculatePercentage = () =>
  data.allItems.exp.map(item => item.calculatePercentage(data.total.inc));

export const getPercentage = () =>
  data.allItems.exp.map(item => item.getPercentage());
