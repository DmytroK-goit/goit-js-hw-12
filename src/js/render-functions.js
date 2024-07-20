import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('#gallery');

export function renderImages(images) {
  const markup = images
    .map(image => {
      return `
      <div class="image-card">
            <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" /></a>
            <div class="image-text">
        <p>likes: ${image.likes}</p>
        <p>views: ${image.views}</p>
        <p>comments: ${image.comments}</p>
        <p>downloads: ${image.downloads}</p>
        </div>
      </div>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
const lightbox = new SimpleLightbox('.image-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  navText: ['&larr;', '&rarr;'],
  closeText: '&times;',
});