"use strict";
var gBooks,
  gIdCnt = 1,
  gCurrBook,
  gSortStatus = "title";

function init() {
  gBooks = getStorage("gBooks");
  gIdCnt = getStorage("gIdCnt");
  if (!gBooks) createGlobalBooks();
  renderBooks();
}

function createBook(title, price) {
  return {
    id: gIdCnt++,
    title,
    price,
    rating: 0
  };
}

function createGlobalBooks() {
  gBooks = [];
  gBooks.push(
    createBook("Harry Potter", 40),
    createBook("Harry Potter 2", 50),
    createBook("Harry Potter 3", 60)
  );
}

function newBook(title, price) {
  gBooks.push(createBook(title, price));
  saveStorage("gBooks", gBooks);
  saveStorage("gIdCnt", gIdCnt);
}

function findBook(bookId) {
  return gBooks.find(function(book, idx) {
    if (book.id === bookId) {
      gCurrBook = idx;
      return book;
    }
  });
}

function openMudal(bookId, type) {
  if (document.querySelector(type).style.display === "inline") {
    return (document.querySelector(type).style.display = "none");
  }
  var book = findBook(bookId);
  if (type === ".read") {
    document.querySelector(
      ".rating"
    ).innerHTML = `<button onclick=changeRating('-',${book.id}) class='btn-danger'>-</button>${book.rating}<button onclick=changeRating('+',${book.id}) class='btn-success'>+</button>`;
  }
  document.querySelector(type).style.display = "inline";
}

function changeRating(operator, bookId) {
  var book = findBook(bookId);
  var temp = gBooks[gCurrBook].rating;
  switch (operator) {
    case "+":
      temp++;
      break;
    case "-":
      temp--;
  }
  gBooks[gCurrBook].rating = Math.abs(temp % 10);
  renderRating(book);
}

function sortBooks() {
  return gBooks.sort(function(a, b) {
    return a[gSortStatus] > b[gSortStatus] ? 1 : -1;
  });
}
function sortBy(sortBy) {
  gSortStatus = sortBy;
  renderBooks();
}

function deleteBook(bookId) {
  findBook(bookId);
  gBooks.splice(gCurrBook, 1);
  saveStorage("gBooks", gBooks);
  saveStorage("gIdCnt", gIdCnt);
  return renderBooks();
}
