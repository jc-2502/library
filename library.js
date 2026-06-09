let library = [];

function Book(title, author, read) {
  if (!new.target) {
    throw Error('include new when calling constructor');
  }

  this.title = title;
  this.author = author;
  this.read = read;
}

function addBookToLibrary(title, author, read) {
  let book = new Book(title, author, read);

  library.push(book);
}
