class Expense {
  constructor(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
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
    exp: [],
    total: {
      inc: 0,
      exp: 0
    }
  }
};

export function addItem({ type, description, value }) {
  let ID, newItem;
  ID = 0;
  if (type === "inc") {
    newItem = new Income(ID, description, value);
  } else {
    newItem = new Expense(ID, description, value);
  }
  return newItem;
}
