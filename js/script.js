document.addEventListener("DOMContentLoaded", function () {
  const formInput = document.getElementById("inputBook");

  formInput.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addBook();
  });

  const formSearch = document.getElementById("searchBook");
  formSearch.addEventListener("submit", function (ev) {
    ev.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondataloaded", function () {
  refreshDataFromBooks();
});

document.addEventListener("ondatasaved", function () {
  alert("item saved!");
});

function confirmAction(message) {
  return confirm(message);
}
