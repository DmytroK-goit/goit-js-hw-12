import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { performSearch, showLoader, hideLoader } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions';

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const searchQuery = formData.get('query');

  if (searchQuery && searchQuery.trim()) {
    showLoader();
    performSearch(searchQuery.trim())
      .then(response => {
        if (!response.ok) {
          throw new Error('Не вдалося виконати запит.');
        }
        return response.json();
      })
      .then(data => {
        hideLoader();
        if (data.totalHits > 0) {
          iziToast.show({
            position: 'topRight',
            backgroundColor: 'green',
            message: `Found ${data.totalHits} results.`,
          });
          return data.hits;
        } else {
          iziToast.show({
            position: 'topRight',
            backgroundColor: 'red',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
          return [];
        }
      })
      .then(results => {
        console.log(results);
        renderImages(results);
      })
      .catch(error => {
        hideLoader(),
          iziToast.show({
            position: 'topRight',
            backgroundColor: 'red',
            message: 'Error during the request. Please try again later.',
          });
        throw error;
      });
  } else {
    iziToast.show({
      position: 'center',
      backgroundColor: 'orange',
      message: 'Будь ласка, введіть пошуковий запит.',
    });
  }
});
