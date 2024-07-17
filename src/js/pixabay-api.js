import axios from 'axios';
const loader = document.querySelector('.loader');

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function performSearch(searchQuery) {
  const API_KEY = '44758497-ea11318ae0823ef09cb8fbdb5';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchQuery
  )}&image_type=photo`;
  return fetch(URL);
}
