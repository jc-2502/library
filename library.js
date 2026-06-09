let library = [];

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
