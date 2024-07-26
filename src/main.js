import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { performSearch, showLoader, hideLoader } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions';

const fetchPostsBtn = document.querySelector('.btn');
const searchForm = document.querySelector('#search-form');
let page = 1;
let searchQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  const formData = new FormData(event.target);
  searchQuery = formData.get('query');
  if (!searchQuery.trim()) {
  return iziToast.show({
  position: 'topRight',
  backgroundColor: 'orange',
  message: 'Будь ласка, введіть пошуковий запит.',
})}

  if (searchQuery && searchQuery.trim()) {
    try {
      showLoader();
      const images = await performSearch(searchQuery.trim(), page);
      console.log(images.hits);
      if (images.totalHits > 0) {
        iziToast.show({
          position: 'topRight',
          backgroundColor: 'green',
          message: `Found ${images.totalHits} results.`,
        });
      }
      if (images.totalHits === 0) {
        console.log(images.totalHits);
         iziToast.show({
          position: 'topRight',
          backgroundColor: 'yellow',
          message: `Found ${images.totalHits} results.`,
         });
        return defGallery;
      }
      renderImages(images.hits);
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
      page += 1;
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

//     showLoader();
//     performSearch(searchQuery.trim())
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Не вдалося виконати запит.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         hideLoader();
//         if (data.totalHits > 0) {
//           iziToast.show({
//             position: 'topRight',
//             backgroundColor: 'green',
//             message: `Found ${data.totalHits} results.`,
//           });
//           return data.hits;
//         } else {
//           iziToast.show({
//             position: 'topRight',
//             backgroundColor: 'red',
//             message:
//               'Sorry, there are no images matching your search query. Please try again!',
//           });
//           return [];
//         }
//       })
//       .then(results => {
//         console.log(results);
//         renderImages(results);
//       })
//       .catch(error => {
//         hideLoader(),
//           iziToast.show({
//             position: 'topRight',
//             backgroundColor: 'red',
//             message: 'Error during the request. Please try again later.',
//           });
//         throw error;
//       });
//   } else {
//     iziToast.show({
//       position: 'center',
//       backgroundColor: 'orange',
//       message: 'Будь ласка, введіть пошуковий запит.',
//     });
//   }
// });
