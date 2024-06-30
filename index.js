
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

// Middleware para manejar rutas desconocidas
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
