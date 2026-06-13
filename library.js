let library = [];

const booksContainer = document.querySelector('.books');

function Book(id, title, author, status) {
  if (!new.target) {
    throw Error('include new when calling constructor');
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.status = status;
}

function addBookToLibrary(title, author, status) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, status);

  library.push(book);
}

function displayBooks() {
  for (const book of library) {
    const bookContainer = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const status = document.createElement('div');

    title.textContent = book.title;
    author.textContent = book.author;
    status.textContent = book.status;

    bookContainer.classList.add('book');
    title.classList.add('title');
    author.classList.add('author');
    status.classList.add('status');

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(status);
    booksContainer.appendChild(bookContainer);
  };
}

addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', 'finished');
addBookToLibrary('Predictably Irrational', 'Dan Ariely', 'finished');
addBookToLibrary('Nudge', 'Richard Thaler and Cass Sunstein', 'reading');
addBookToLibrary('Ulysses', 'James Joyce', 'not started');
displayBooks();

const addBookForm = document.querySelector('#add-book');
addBookForm.addEventListener('submit', addBookFromForm);

function addBookFromForm(event) {
  event.preventDefault();

  const formElements = event.target.elements;
  const enteredTitle = formElements['entered-title'].value;
  const enteredAuthor = formElements['entered-author'].value;
  const selectedStatus = formElements['selected-status'].value;

  addBookToLibrary(enteredTitle, enteredAuthor, selectedStatus);
}
