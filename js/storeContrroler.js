function renderBooks() {
  var strHTML = "";
  var eltable = document.querySelector("tbody");
  var sortedBooks = sortBooks();
  sortedBooks.forEach(function(book) {
    strHTML += `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}</td>
        <td><button class='btn-primary' onclick="openMudal(${book.id},'.read')">Read</button>
        <button class='btn-success' onclick="openMudal(${book.id},'.update')">Update</button>
        <button class='btn-danger' onclick="deleteBook(${book.id})">Delete</button>
 <td>      </td>
        </tr>`;
  });
  eltable.innerHTML = strHTML;
}

function readAndAddNewBook() {
  var form = document.querySelectorAll(".form-control");
  var newTitle = form[0].value;
  var newPrice = form[1].value;
  if (newTitle === "" || newPrice === "") return;
  newBook(newTitle, newPrice);
  form[0].value = "";
  form[1].value = "";
  renderBooks();
}

function renderRating(book) {
  document.querySelector(
    ".rating"
  ).innerHTML = `<button onclick=changeRating('-',${book.id}) class='btn-danger'>-</button>${book.rating}<button onclick=changeRating('+',${book.id}) class='btn-success'>+</button>`;
}

function updatePrice() {
  var newPrice = document.querySelector(".form");
  if (!newPrice.value) return;
  gBooks[gCurrBook].price = newPrice.value;
  newPrice.value = "";
  openMudal();
  renderBooks();
  saveStorage("gIdCnt", gIdCnt);
}
