const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const guest = urlParams.has('guest') ? urlParams.get('guest') : '';
window.onload = () => {
  document.querySelector('.guest').append(guest);

  const OS = getOS()
  document.querySelector('.card').addEventListener('click', () => {
    toggleDetail()
    if (OS !== 'iOS' && musicLoadState === 'notloaded') {
      loadMusic()
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
  soundIsOn = !soundIsOn
  if (soundIsOn) {
    audioCtx.resume()
    switchIcon('.pause-icon')
  } else {
    audioCtx.suspend()
    switchIcon('.play-icon')
  }
}

function switchIcon(iconClass) {
  document.querySelector('.play-icon').classList.add('hidden')
  document.querySelector('.pause-icon').classList.add('hidden')
  document.querySelector('.loading-icon').classList.add('hidden')
  document.querySelector(iconClass).classList.remove('hidden')
}

var soundIsOn = true;
var source;
var audioCtx;
var musicLoadState = 'notloaded';
function loadMusic() {
  musicLoadState = 'loading';
  switchIcon('.loading-icon')
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createBufferSource();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'asset/background-music.mp3');
  xhr.responseType = 'arraybuffer';
  xhr.addEventListener('load', function (r) {
    musicLoadState = 'loaded';
    switchIcon('.pause-icon')
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

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}