let library = [];

const booksContainer = document.querySelector('.books');

function Book(id, title, author, read) {
  if (!new.target) {
    throw Error('include new when calling constructor');
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title, author, read) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, read);

  library.push(book);
}

function displayBooks() {
  displayColumnHeaders();

  for (const book of library) {
    const bookContainer = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const readStatus = document.createElement('div');

    title.textContent = book.title;
    author.textContent = book.author;
    readStatus.textContent = (book.read) ? 'read': 'not read';

    bookContainer.classList.add('book');
    bookContainer.classList.add('books-row');
    title.classList.add('title');
    author.classList.add('author');
    readStatus.classList.add('read');

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(readStatus);
    booksContainer.appendChild(bookContainer);
  };
}

function displayColumnHeaders() {
  const columnHeadersContainer = document.createElement('div');

  columnHeaders = ['Title', 'Author', 'Read'];

  for (const columnHeader of columnHeaders) {
    const headerElement = document.createElement('h3');
    headerElement.textContent = columnHeader;
    headerElement.classList.add('column-header');
    columnHeadersContainer.appendChild(headerElement);
  }

  columnHeadersContainer.classList.add('books-row');
  booksContainer.appendChild(columnHeadersContainer);
}

addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', true);
addBookToLibrary('Predictably Irrational', 'Dan Ariely', true);
addBookToLibrary('Nudge', 'Richard Thaler and Cass Sunstein', false);
displayBooks();
