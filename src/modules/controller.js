document.addEventListener("keypress", function(e) {
  if (e.keyCode === 13 || e.which === 13) {
    ctrlAddItems();
  }
});

document.querySelector(".add__btn").addEventListener("click", function() {
  ctrlAddItems();
});
