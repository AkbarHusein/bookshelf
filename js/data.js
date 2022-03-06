const STORAGE_KEY = "shelfBookApp";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Maaf browser tidak support web storage!");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function composeBookObject(title, author, year, isComplete) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
}

function updateDataStorage() {
  if (isStorageExist()) saveData();
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function findBookPosition(id) {
  return books.findIndex((data) => {
    return data.id === id;
  });
}

function findBookId(id) {
  return books.find((data) => {
    if (data.id === id) return data;
  });
}
