const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const guest = urlParams.has('guest') ? urlParams.get('guest') : '';
window.onload = () => {
  document.querySelector('.guest').append(guest);

  const audio = document.querySelector('audio')
  audio.onplay = function() {
    document.querySelector('.play-icon').classList.add('hidden')
    document.querySelector('.pause-icon').classList.remove('hidden')
  }
  audio.onpause = function() {
    document.querySelector('.play-icon').classList.remove('hidden')
    document.querySelector('.pause-icon').classList.add('hidden')
  }

  document.querySelector('.card').addEventListener('click', () => {
    toggleDetail()
    if (playMusic) {
      playMusic()
      playMusic = null
    }
  })
  
  document.querySelector('.audio-button').addEventListener('click', toggleMusic)
}

function toggleDetail() {
  const element = document.querySelector('.card')
  if (element.classList.contains('open')) {
    element.classList.remove('open')
  } else {
    element.classList.add('open')
  }
}

function toggleMusic() {
  const audio = document.querySelector('audio')
  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}

function playMusic() {
  document.querySelector('audio').play()
}