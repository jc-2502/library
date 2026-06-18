let library = [];
let counts = {};

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

Book.prototype.changeStatus = function (newStatus) {
  this.status = newStatus;
}

function addBookToLibrary(title, author, status) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, status);

  library.push(book);

  displayBook(book);
}

counts.getInitialCounts = function () {
  const statuses = ['finished', 'reading', 'not started'];

  statuses.forEach((status) => {
    this[status] = library.reduce((count, book) => (book.status === status) ? ++count : count, 0);
  });

  this['total'] = statuses.reduce((total, status) => total + this[status], 0);

  displayCounts();
};

counts.updateCountsAfterAddingBook = function (statusToIncrement) {
  ++this[statusToIncrement];
  ++this['total'];
  displayCount(statusToIncrement);
  displayCount('total');
};

counts.updateCountsAfterRemovingBook = function (statusToDecrement) {
  --this[statusToDecrement];
  --this['total'];
  displayCount(statusToDecrement);
  displayCount('total');
};

counts.updateCountsAfterChangingStatus = function (statusToDecrement, statusToIncrement) {
  --this[statusToDecrement];
  ++this[statusToIncrement];
  displayCount(statusToDecrement);
  displayCount(statusToIncrement);
};

function displayCounts() {
  const countTypes = ['total', 'finished', 'reading', 'not started'];
  countTypes.forEach((countType) => displayCount(countType));
};

function displayCount(countType) {
  const countElement = document.querySelector(`.${countType.replaceAll(' ','-')}-count`);
  countElement.textContent = ''.concat(countType.charAt(0).toUpperCase(), countType.slice(1), ': ', counts[countType]);
};

function addBookFromForm(event) {
  event.preventDefault();

  const formElements = event.target.elements;
  const enteredTitle = formElements['entered-title'].value;
  const enteredAuthor = formElements['entered-author'].value;
  const selectedStatus = formElements['selected-status'].value;

  addBookToLibrary(enteredTitle, enteredAuthor, selectedStatus);
  counts.updateCountsAfterAddingBook(selectedStatus);

  resetForm(formElements);
}

function resetForm(formElements) {
  const titleInput = formElements['entered-title'];
  titleInput.value = titleInput.defaultValue;
  titleInput.focus();
}

function displayBook(book) {
  const bookContainer = document.createElement('div');
  const title = document.createElement('div');
  const author = document.createElement('div');
  const statusButton = document.createElement('button');
  const removeButton = document.createElement('button');
  const bookRowElements = [title, author, statusButton, removeButton];
  const allBookElements = bookRowElements.concat(bookContainer);
  const buttons = [statusButton, removeButton];

  title.textContent = book.title;
  author.textContent = book.author;
  statusButton.textContent = book.status;
  removeButton.textContent = 'remove';

  bookContainer.classList.add('book');
  title.classList.add('title');
  author.classList.add('author');
  statusButton.classList.add('status');
  removeButton.classList.add('remove');

  allBookElements.forEach(element => element.dataset.id = book.id);

  statusButton.addEventListener('click', toggleStatus);
  removeButton.addEventListener('click', removeBook);
  buttons.forEach(button => button.addEventListener('keydown', handleKeydownOnButton));
  buttons.forEach(button => button.addEventListener('keyup', handleKeyupOnButton));

  bookRowElements.forEach(element => bookContainer.appendChild(element));
  booksContainer.appendChild(bookContainer);
}

function handleKeydownOnButton(event) {
  if (event.key === 'Enter') {
    // prevent Enter from sending click event - only want removeBook / toggleStatus to run on keyup
    event.preventDefault();
  }
}

function handleKeyupOnButton(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    if (event.target.classList.contains('remove')) {
      removeBook(event);
    } else if (event.target.classList.contains('status')) {
      toggleStatus(event);
    }
  }
}

function toggleStatus(event) {
  const idToUpdate = event.target.dataset.id;
  const currentStatus = event.target.textContent;
  let newStatus;

  if (currentStatus === 'not started') {
    newStatus = 'reading';
  } else if (currentStatus === 'reading') {
    newStatus = 'finished';
  } else {
    newStatus = 'not started';
  }

  event.target.textContent = newStatus;
  counts.updateCountsAfterChangingStatus(currentStatus, newStatus);

  let bookToUpdate = library.find(book => book['id'] === idToUpdate);
  bookToUpdate.changeStatus(newStatus);
}

function removeBook(event) {
  const idToRemove = event.target.dataset.id;

  const bookContainer = document.querySelector(`.book[data-id='${idToRemove}']`);
  const statusToDecrement = document.querySelector(`.status[data-id='${idToRemove}']`).textContent;
  bookContainer.remove();
  counts.updateCountsAfterRemovingBook(statusToDecrement);

  library = library.filter(book => book['id'] !== idToRemove);
  // library.splice(library.findIndex(book => book['id'] === idToRemove), 1);
}

addBookForm.addEventListener('submit', addBookFromForm);

addBookToLibrary('Thinking, Fast and Slow', 'Daniel Kahneman', 'finished');
addBookToLibrary('Predictably Irrational', 'Dan Ariely', 'finished');
addBookToLibrary('Nudge', 'Richard Thaler and Cass Sunstein', 'reading');
addBookToLibrary('Ulysses', 'James Joyce', 'not started');

counts.getInitialCounts();
