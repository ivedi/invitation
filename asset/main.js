const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const guest = urlParams.has('guest') ? urlParams.get('guest') : '';
window.onload = () => {
  document.querySelector('.guest').append(guest);
  document.querySelector('body').addEventListener('click', toggleDetail)
}

function toggleDetail() {
  const element = document.querySelector('.card')
  if (element.classList.contains('open')) {
    element.classList.remove('open')
  } else {
    element.classList.add('open')
  }
}
