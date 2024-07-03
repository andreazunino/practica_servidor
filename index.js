const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

// Middleware para registrar mensajes en la consola según configuración 'tiny'
app.use(morgan('tiny'));

// Middleware para analizar solicitudes JSON
app.use(express.json());

let books = [
  { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
  { id: 2, title: 'Los ojos del perro siberiano', author: 'Antonio Santa Ana' },
  { id: 3, title: 'Quimica general', author: 'Raymond Chang' }
];

let authors = [
  { id: 1, name: 'J.K. Rowling' },
  { id: 2, name: 'Antonio Santa Ana' },
  { id: 3, name: 'Raymond Chang' }
];

let users = [
  { id: 1, name: 'Carlos Perez' },
  { id: 2, name: 'Juana de Arco' },
  { id: 3, name: 'Peter Parker' }
];

let loans = [
  { id: 1, bookId: 1, userId: 1, loanDate: '2023-06-01' },
  { id: 2, bookId: 2, userId: 2, loanDate: '2023-06-02' },
  { id: 3, bookId: 3, userId: 3, loanDate: '2023-06-03' }
];

// Rutas para libros
app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(book => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).end();
  }
});

app.post('/api/books', (req, res) => {
  const book = req.body;

  if (!book.title || !book.author) {
    return res.status(400).json({ error: 'Title or author missing' });
  }

  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex !== -1) {
    if (title) books[bookIndex].title = title;
    if (author) books[bookIndex].author = author;
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(book => book.id !== id);
  res.status(204).end();
});

// Rutas para autores
app.get('/api/authors', (req, res) => {
  res.json(authors);
});

app.get('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  const author = authors.find(author => author.id === id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).end();
  }
});

app.post('/api/authors', (req, res) => {
  const author = req.body;

  if (!author.name) {
    return res.status(400).json({ error: 'Name missing' });
  }

  author.id = authors.length + 1;
  authors.push(author);
  res.status(201).json(author);
});

app.put('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const authorIndex = authors.findIndex(author => author.id === id);

  if (authorIndex !== -1) {
    if (name) authors[authorIndex].name = name;
    res.json(authors[authorIndex]);
  } else {
    res.status(404).json({ error: 'Author not found' });
  }
});

app.delete('/api/authors/:id', (req, res) => {
  const id = Number(req.params.id);
  authors = authors.filter(author => author.id !== id);
  res.status(204).end();
});

// Rutas para usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

app.post('/api/users', (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res.status(400).json({ error: 'Name missing' });
  }

  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    if (name) users[userIndex].name = name;
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).end();
});

// Rutas para prestamos
app.get('/api/loans', (req, res) => {
  res.json(loans);
});

app.get('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  const loan = loans.find(loan => loan.id === id);
  if (loan) {
    res.json(loan);
  } else {
    res.status(404).end();
  }
});

app.post('/api/loans', (req, res) => {
  const loan = req.body;

  if (!loan.bookId || !loan.userId || !loan.loanDate) {
    return res.status(400).json({ error: 'Book ID, User ID, or loan date missing' });
  }

  loan.id = loans.length + 1;
  loans.push(loan);
  res.status(201).json(loan);
});

app.put('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  const { bookId, userId, loanDate } = req.body;

  const loanIndex = loans.findIndex(loan => loan.id === id);

  if (loanIndex !== -1) {
    if (bookId) loans[loanIndex].bookId = bookId;
    if (userId) loans[loanIndex].userId = userId;
    if (loanDate) loans[loanIndex].loanDate = loanDate;
    res.json(loans[loanIndex]);
  } else {
    res.status(404).json({ error: 'Loan not found' });
  }
});

app.delete('/api/loans/:id', (req, res) => {
  const id = Number(req.params.id);
  loans = loans.filter(loan => loan.id !== id);
  res.status(204).end();
});

// Middleware para manejar rutas desconocidas
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
