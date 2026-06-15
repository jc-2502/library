let library = [];

const addBookForm = document.querySelector('#add-book');
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

  displayBook(book);
}

function displayBook(book) {
  const bookContainer = document.createElement('div');
  const title = document.createElement('div');
  const author = document.createElement('div');
  const status = document.createElement('div');
  const removeButton = document.createElement('button');
  const bookRowElements = [title, author, status, removeButton];
  const allBookElements = bookRowElements.concat(bookContainer);

  title.textContent = book.title;
  author.textContent = book.author;
  status.textContent = book.status;
  removeButton.textContent = 'remove';

  bookContainer.classList.add('book');
  title.classList.add('title');
  author.classList.add('author');
  status.classList.add('status');
  removeButton.classList.add('remove');

  allBookElements.forEach(element => element.dataset.id = book.id);

  removeButton.addEventListener('click', removeBook);
  removeButton.addEventListener('keydown', handleKeydownOnRemoveButton);
  removeButton.addEventListener('keyup', handleKeyupOnRemoveButton);

  bookRowElements.forEach(element => bookContainer.appendChild(element));
  booksContainer.appendChild(bookContainer);
}

function handleKeydownOnRemoveButton(event) {
  if (event.key === 'Enter') {
    // prevent Enter from sending click event - only want removeBook to run on keyup
    event.preventDefault();
  }
}

function handleKeyupOnRemoveButton(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    removeBook(event);
  }
}

function removeBook(event) {
  const idToRemove = event.target.dataset.id;

  const bookContainer = document.querySelector(`.book[data-id='${idToRemove}']`);
  bookContainer.remove();

  library = library.filter(book => book['id'] !== idToRemove);
  // library.splice(library.findIndex(book => book['id'] === idToRemove), 1);
}

function addBookFromForm(event) {
  event.preventDefault();

  const formElements = event.target.elements;
  const enteredTitle = formElements['entered-title'].value;
  const enteredAuthor = formElements['entered-author'].value;
  const selectedStatus = formElements['selected-status'].value;

  addBookToLibrary(enteredTitle, enteredAuthor, selectedStatus);

  resetForm(formElements);
}

function resetForm(formElements) {
  const titleInput = formElements['entered-title'];
  titleInput.value = titleInput.defaultValue;
  titleInput.focus();
}

addBookForm.addEventListener('submit', addBookFromForm);

addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', 'finished');
addBookToLibrary('Predictably Irrational', 'Dan Ariely', 'finished');
addBookToLibrary('Nudge', 'Richard Thaler and Cass Sunstein', 'reading');
addBookToLibrary('Ulysses', 'James Joyce', 'not started');
