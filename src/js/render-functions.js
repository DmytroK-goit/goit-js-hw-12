import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('#gallery');
  if (!gallery) {
    console.error('Елемент #gallery не знайдений в DOM.');
    return;
  }

  if (images.length === 0) {
    gallery.innerHTML = '<p>Нічого не знайдено.</p>';
    return;
  }

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

  gallery.innerHTML = markup;
  lightbox.refresh();
}
const lightbox = new SimpleLightbox('.image-card a', {
  captionsData: 'alt',
  captionDelay: 250,
  navText: ['&larr;', '&rarr;'],
  closeText: '&times;',
});
