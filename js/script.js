document.addEventListener("DOMContentLoaded", () => {
  const formInput = document.getElementById("inputBook");
  /* tambahkan data buku jika submit terjadi */
  formInput.addEventListener("submit", (ev) => {
    ev.preventDefault();
    addBook();
  });

  /* Cek apakah browser support web storage */
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

document.addEventListener("ondatasaved", () => {
  alert("item saved!");
});
