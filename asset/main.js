const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const guest = urlParams.has('guest') ? urlParams.get('guest') : '';
window.onload = () => {
  document.querySelector('.guest').append(guest);
}
