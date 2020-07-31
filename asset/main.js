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
    playMusic()
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
  if (soundIsOn) {
    audioCtx.suspend()
  } else {
    audioCtx.resume()
  }
  soundIsOn = !soundIsOn
}

var soundIsOn = true;
var source;
var audioCtx;
function playMusic() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createBufferSource();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'asset/background-music.mp3');
  xhr.responseType = 'arraybuffer';
  xhr.addEventListener('load', function (r) {
      audioCtx.decodeAudioData(
              xhr.response, 
              function (buffer) {
                  source.buffer = buffer;
                  source.connect(audioCtx.destination);
                  source.loop = false;
              });
      source.start(0);
  });
  xhr.send();
}