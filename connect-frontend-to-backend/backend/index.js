import express from 'express';

const app = express();
const PORT = process.env.PORT || 8000;

// DATA
const jokes = [
  {
    id: 1,
    title: "Why don't scientists trust atoms?",
    content: 'Because they make up everything!',
  },
  {
    id: 2,
    title: 'How do you organize a space party?',
    content: 'You planet.',
  },
  {
    id: 3,
    title: "Why don't eggs tell jokes?",
    content: 'Because they might crack up.',
  },
  {
    id: 4,
    title: 'What do you call fake spaghetti?',
    content: 'An impasta!',
  },
  {
    id: 5,
    title: "Why couldn't the bicycle stand up by itself?",
    content: 'Because it was two-tired.',
  },
];

app.get('/', (req, res) => {
  res.send('Server on top');
});

app.get('/api/jokes', (req, res) => {
  res.send(jokes);
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
