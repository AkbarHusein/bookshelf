const INCOMPLETE_LIST_ID = "incompleteBookshelfList";
const COMPLETE_LIST_ID = "completeBookshelfList";
const ITEMBOOK_ID = "itemId";

function refreshDataFromBooks() {
  const inCompleteList = document.getElementById(INCOMPLETE_LIST_ID);
  const completeList = document.getElementById(COMPLETE_LIST_ID);

  for (const book of books) {
    // ! DOM HTML Element
    const newBook = makeBookData(
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    newBook[ITEMBOOK_ID] = book.id;

    if (book.isComplete) {
      completeList.append(newBook);
    } else {
      inCompleteList.append(newBook);
    }
  }
}
// TODO tambahkan data DOM.
function addBook() {
  const inCompleteBookList = document.getElementById("incompleteBookshelfList");
  const completeBookList = document.getElementById("completeBookshelfList");
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookIsComplete = document.getElementById("inputBookIsComplete").checked;

  // *Create DOM Object.
  const book = makeBookData(bookTitle, bookAuthor, bookYear, bookIsComplete);
  // *Create Object book save toarray  books.
  const objectBook = composeBookObject(
    bookTitle,
    bookAuthor,
    bookYear,
    bookIsComplete
  );

  book[ITEMBOOK_ID] = objectBook.id;
  books.push(objectBook);

  // *Tampilkan Kehalaman
  if (bookIsComplete) {
    completeBookList.append(book);
  } else {
    inCompleteBookList.append(book);
  }

  updateDataStorage();
}

function makeBookData(title, author, year, isComplete) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${author}`;

  const textYear = document.createElement("p");
  textYear.innerText = `Tahun: ${year}`;

  const articleWrapper = document.createElement("article");
  articleWrapper.classList.add("book_item");

  const actionWrapper = document.createElement("div");
  actionWrapper.classList.add("action");

  if (isComplete) {
    actionWrapper.append(createBtnInCompleteRead(), createBtnDelete());
  } else {
    actionWrapper.append(createBtnCompleteRead(), createBtnDelete());
  }

  articleWrapper.append(textTitle, textAuthor, textYear, actionWrapper);

  return articleWrapper;
}
/* Tombol complete read */
function createBtnCompleteRead() {
  return createButton(
    ["green", "complete-read"],
    "Selesai dibaca",
    function (ev) {
      addBookToCompleteRead(ev.target.parentElement.parentElement);
    }
  );
}
/* Tombol incomplete read */
function createBtnInCompleteRead() {
  return createButton(
    ["green", "incomplete-read"],
    "Belum Selesai dibaca",
    function (ev) {
      addBookToInCompleteRead(ev.target.parentElement.parentElement);
    }
  );
}
/* Tombol delete */
function createBtnDelete() {
  return createButton(["red", "delete"], "Hapus buku", function (ev) {
    deleteBook(ev.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, textBtn, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass[0], buttonTypeClass[1]);
  button.innerText = textBtn;
  button.addEventListener("click", function (ev) {
    eventListener(ev);
    ev.stopPropagation();
  });
  return button;
}

function addBookToCompleteRead(bookElement) {
  const completeReadBook = document.getElementById(COMPLETE_LIST_ID);
  const titleBook = bookElement.childNodes[0].innerText;
  const authorBook = bookElement.childNodes[1].innerText;
  const yearBook = bookElement.childNodes[2].innerText;

  // *DOM : Create new book complete read
  const newBook = makeBookData(titleBook, authorBook, yearBook, true);
  // *DATA : change status book on array books
  const book = findBookId(bookElement[ITEMBOOK_ID]);
  book.isComplete = true;
  newBook[ITEMBOOK_ID] = book.id;
  // *DOM add book form incomplete to complete.
  completeReadBook.append(newBook);
  // *DOM : delete book from incomplete
  bookElement.remove();
  updateDataStorage();
}
function addBookToInCompleteRead(bookElement) {
  const inCompleteReadBook = document.getElementById(INCOMPLETE_LIST_ID);
  const titleBook = bookElement.childNodes[0].innerText;
  const authorBook = bookElement.childNodes[1].innerText;
  const yearBook = bookElement.childNodes[2].innerText;

  // *DOM : Create new book incomplete read
  const newBook = makeBookData(titleBook, authorBook, yearBook, false);
  // *DATA : change status book on array books
  const book = findBookId(bookElement[ITEMBOOK_ID]);
  book.isComplete = false;
  newBook[ITEMBOOK_ID] = book.id;
  // *DOM : add book form complete to incomplete read.
  inCompleteReadBook.append(newBook);
  // *DOM : delete book from complete read
  bookElement.remove();
  updateDataStorage();
}

function deleteBook(bookElement) {
  const positionElement = findBookPosition(bookElement[ITEMBOOK_ID]);
  books.splice(positionElement, 1);
  bookElement.remove();
  updateDataStorage();
}

function searchBook() {
  const searchBook = document.getElementById("searchBookTitle").value;
  const inCompleteBookList = document.getElementById("incompleteBookshelfList");
  const completeBookList = document.getElementById("completeBookshelfList");

  inCompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  for (const book of books) {
    if (book.title.toLowerCase().includes(searchBook.toLowerCase())) {
      const newBook = makeBookData(
        book.title,
        book.author,
        book.year,
        book.isComplete
      );
      newBook[ITEMBOOK_ID] = book.id;

      if (book.isComplete) {
        completeBookList.append(newBook);
      } else {
        inCompleteBookList.append(newBook);
      }
    }
  }
}
