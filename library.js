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
  for (const book of library) {
    const bookContainer = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const readStatus = document.createElement('p');

    title.textContent = book.title;
    author.textContent = book.author;
    readStatus.textContent = (book.read) ? 'read': 'not read';

    bookContainer.classList.add('book');
    title.classList.add('title');
    author.classList.add('author');
    readStatus.classList.add('read');

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(readStatus);
    booksContainer.appendChild(bookContainer);
  };
}

addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', true);
addBookToLibrary('Predictably Irrational', 'Dan Ariely', true);
addBookToLibrary('Nudge', 'Richard Thaler and Cass Sunstein', false);
displayBooks();
