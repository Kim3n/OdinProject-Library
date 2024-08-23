var modal = document.getElementById("addBookModal");
var btn = document.getElementById("addBook");
var submitBtn = document.getElementById("submit");
var span = document.getElementsByClassName("close")[0];
var booksContainer = document.getElementById("booksContainer");
var bookId = 0;

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

submitBtn.onclick = function() {
  if(addBookFromForm()){
    modal.style.display = "none";
  }
  
}

span.onclick = function() {
  modal.style.display = "none";
}

// LIBRARY SCRIPT

let myLibrary = [];

function Book(id,title, author, pages, completed) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

function addBookToLibrary(title, author, pages, completed) {
  let book = new Book(bookId,title, author, pages, completed);
  myLibrary.push(book);
  getBooks();
  bookId = bookId + 1;
}

function addBookFromForm(){
  var bookName = document.getElementById("title").value;
  var authorName = document.getElementById("author").value;
  var pagesAmount = document.getElementById("pages").value;
  var completedBook = document.getElementById("check-23").checked;

  if(bookName != "" && authorName != "" && pagesAmount != ""){
    console.log(bookName, authorName, pagesAmount,completedBook);
    addBookToLibrary(bookName, authorName, pagesAmount,completedBook);
    document.getElementById("myForm").reset();
    return true;
  }
  else{
    return false;
  }
  
}

function changeReadStatus(bookID) {
  let currentBook = myLibrary.find((item) => {return item.id == bookID});
  currentBook.completed = !currentBook.completed;
  getBooks();
}


function removeBookFromLibrary(bookID) {
  myLibrary = myLibrary.filter(item => item.id !== bookID);
  getBooks();
}

function getBooks(){
    //CLEAR CARDS 
    booksContainer.innerHTML = null;
    for (const book of myLibrary) {
        console.log(book);
        var bookCard = document.createElement("div");
        bookCard.setAttribute('class', 'bookCard');

        if(book.completed){
          var ribbon = document.createElement("h4");
          ribbon.setAttribute('class', 'ribbon');
          ribbon.innerHTML = "Read";
          bookCard.appendChild(ribbon);
        }
        else{
          var ribbon = document.createElement("h4");
          ribbon.setAttribute('class', 'ribbon');
          bookCard.appendChild(ribbon);
        }

        var bookClose = document.createElement("span")
        bookClose.setAttribute('class', 'close');
        bookClose.innerHTML= "&times";
        bookClose.onclick = function(){removeBookFromLibrary(book.id)};  
        bookCard.appendChild(bookClose);

        //append title and other information
        var bookTitle = document.createElement("h2");
        bookTitle.setAttribute('class', 'bookTitle');
        bookTitle.innerHTML = book.title;
        bookCard.appendChild(bookTitle);

        var bookAuthor= document.createElement("p");
        bookAuthor.setAttribute('class', 'bookAuthor');
        bookAuthor.innerHTML = "By " + book.author;
        bookCard.appendChild(bookAuthor);

        var bookPages= document.createElement("p");
        bookPages.setAttribute('class', 'bookPages');
        bookPages.innerHTML = book.pages + " pages";
        bookCard.appendChild(bookPages);


        //Remove later, just for testing purposes
        //var bookRead= document.createElement("p");
        //bookRead.setAttribute('class', 'bookRead');
        //bookRead.innerHTML = book.completed;
        //bookCard.appendChild(bookRead);


        var bookReadButton = document.createElement("Button");
        bookReadButton.setAttribute('class', 'button-40');
        bookReadButton.innerHTML = "Read?";
        bookReadButton.setAttribute('id', 'read-button-'+book.id);
        bookReadButton.setAttribute("value", book.id);
        bookReadButton.onclick = function(){changeReadStatus(book.id)};  
        bookCard.appendChild(bookReadButton);

        //APPEND THE BOOK TO THE CONTAINER
        booksContainer.appendChild(bookCard);
    }
}


getBooks();

console.log(myLibrary.length);


document.addEventListener("DOMContentLoaded", function() {

});