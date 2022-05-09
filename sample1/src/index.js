import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { rest } from 'msw';
import { setupWorker } from 'msw';
const allRecipes = [
  { id: 1, title: 'Burger' },
  { id: 2, title: 'French toast' },
  { id: 3, title: 'Salmon' }
];
const server = setupWorker(
  rest.get('/api/recipes', (req, res, ctx) => {
    if (req.url.searchParams.get('ingredient') === 'fish') {
      return res(ctx.json({ recipes: allRecipes.filter(recipe => recipe.id === 3) }));
    }
    return res(ctx.status(200), ctx.json({ recipes: allRecipes }));
  })
);

server.start();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);