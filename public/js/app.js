import { addCard } from './addCard.js';
import { editCard } from './editCard.js';
import { removeCard } from './removeCard.js';

document.getElementById('inputForm').addEventListener('submit', function (e) {
  addCard(e);
});

document
  .getElementById('cardContainer')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('editCard')) {
      editCard(e);
    } else if (e.target.classList.contains('removeCard')) {
      removeCard(e);
    }
  });
