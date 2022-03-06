document.addEventListener("DOMContentLoaded", function () {
  const formInput = document.getElementById("inputBook");
  /* tambahkan data buku jika submit terjadi */
  formInput.addEventListener("submit", function (ev) {
    ev.preventDefault();
    addBook();
  });

  /* Cari Buku */
  const formSearch = document.getElementById("searchBook");
  formSearch.addEventListener("submit", function (ev) {
    ev.preventDefault();
    searchBook();
  });

  /* Cek apakah browser support web storage */
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
