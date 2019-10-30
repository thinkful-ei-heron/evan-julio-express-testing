const express = require('express');
const morgan = require('morgan');
const app = express();

// let's see what 'common' format looks like
app.use(morgan('common'));

const apps = require('./playstore.js');

app.get('/apps', (req, res) => {
  const {sort, genre} = req.query;

  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of App title or Rating');
    }
  }

  if (genre) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
      return res
        .status(400)
        .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
  }

  let results = apps;
  
  if (genre) {
    results = results
      .filter(app => app.Genres.toLowerCase().includes(genre.toLowerCase()));
  }

  if (sort) {
    results
      .sort((a,b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }
  res
    .json(results);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
