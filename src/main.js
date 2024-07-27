import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  performSearch,
  showLoader,
  hideLoader,
  clearGallery,
} from './js/pixabay-api.js';
import { renderImages } from './js/render-functions';

const fetchPostsBtn = document.querySelector('.btn');
const searchForm = document.querySelector('#search-form');
let page = 1;
let searchQuery = '';
let totalResults = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  clearGallery();
  page = 1;
  const formData = new FormData(event.target);
  searchQuery = formData.get('query');
  if (!searchQuery.trim()) {
    return iziToast.show({
      position: 'topRight',
      backgroundColor: 'orange',
      message: 'Будь ласка, введіть пошуковий запит.',
    });
  }

  if (searchQuery && searchQuery.trim()) {
    try {
      showLoader();
      const images = await performSearch(searchQuery.trim(), page);
      console.log(images.hits);
      if (images.totalHits > 0) {
        searchForm = '';
        iziToast.show({
          position: 'topRight',
          backgroundColor: 'green',
          message: `Found ${images.totalHits} results.`,
        });
      }
      if (images.totalHits === 0) {
        clearGallery();
        fetchPostsBtn.style.display = 'none';
        console.log(images.totalHits);
        iziToast.show({
          position: 'topRight',
          backgroundColor: 'yellow',
          message: `Found ${images.totalHits} results.`,
        });
        return;
      }
      renderImages(images.hits);
      totalResults += images.hits.length;
      page += 1;
      if (page > 1) {
        fetchPostsBtn.textContent = 'Fetch more posts';
        fetchPostsBtn.style.display = 'block';
      }
    } catch (error) {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      hideLoader();
    }
  }
});

fetchPostsBtn.addEventListener('click', async () => {
  if (searchQuery && searchQuery.trim()) {
    try {
      showLoader();
      const images = await performSearch(searchQuery.trim(), page);
      renderImages(images.hits);
      totalResults += images.hits.length;
      page += 1;
      checkMaxResults(totalResults, images.totalHits);
    } catch (error) {
      console.log(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      hideLoader();
    }
  }
});

function checkMaxResults(totalResults, totalHits) {
  if (totalResults >= totalHits) {
    fetchPostsBtn.style.display = 'none';
    iziToast.show({
      position: 'topRight',
      backgroundColor: 'yellow',
      message: "We're sorry, but you've reached the end of search results.'",
    });
  }
}
