function Book(title, author, read) {
  if (!new.target) {
    throw Error('include new when calling constructor');
  }

  this.title = title;
  this.author = author;
  this.read = read;
}
