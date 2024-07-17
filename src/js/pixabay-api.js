import axios from 'axios';
const loader = document.querySelector('.loader');
const fetchPostsBtn = document.querySelector('.btn');

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

let page = 1;
const perPage = 20;
const API_KEY = '44758497-ea11318ae0823ef09cb8fbdb5';

export async function performSearch(searchQuery) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    per_page: perPage,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return response.data.hits;
}
