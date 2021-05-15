
//VARIABLES DECLARATION
const play = document.querySelector('#play'),
  pause = document.querySelector('#pause'),
  prev = document.querySelector('#prev'),
  next = document.querySelector('#next'),
  title = document.querySelector('#title'),
  artist = document.querySelector('#artist'),
  start = document.querySelector('#start'),
  stop = document.querySelector('#stop'),
  slider = document.querySelector('#slider'),
  disc = document.querySelector('.cover'),
  musiclist = document.querySelector('#musicList'),
  fileSelect = document.querySelector('#fileSelect'),
  fileElem = document.querySelector('#fileElem')
;
let current = "",
  track = "",
  musicArray = [],
  artists = []
;

//CREATE PLAYLIST OBJECT FOR EASY USAGE | CREATE AUDIO INSTANCE, TITLE AND ARTISTE
const playlist = {
  first: ['Anything Is Possible', new Audio('audio/Anything Is Possible.mp3'), 'Bethel Music'],
  second: ['Safe Retreat', new Audio('audio/Safe Retreat.mp3'), 'King Kaleidoscope'],
  third: ['Always Good', new Audio('audio/Always Good.mp3'), 'Bethel Music'],
  fourth: ['Awake My Soul', new Audio('audio/Awake My Soul.mp3'), 'Hillsong Worship'],
  fifth: ['Beautiful', new Audio('audio/Beautiful.mp3'), 'Eno Michael']
}

//CREATE MUSIC ARRAY AND ARTIST ARRAY
for(let e of Object.values(playlist)) {
  musicArray.push(e[1]);
  artists.push(e[2]);
}

//POPULATE TRACK LIST IN SIDETRAY AND SET ARTIST ATTRIBUTE
for(let e = 0; e < musicArray.length; e++){
  musicArray[e].setAttribute('artist', artists[e]);
  /*html*/ 
  track =
  `<li onclick="clickMusic(event)">
    <i class="fa fa-music icon"></i>
    <div>
      <p class="title2">${musicArray[e].src.substr(musicArray[e].src.lastIndexOf('/')+1).split('%20').join(' ').split('.')[0]}</p>
      <p class="artist2">${artists[e]}</p>
    </div>
  </li>`;
  musiclist.innerHTML += track;
}

//CREATE MUSIC COUNTER (POSITION)
count = 0;
current = musicArray[count];

//ARTISTE NAME AND MUSIC TITLE
function audioTitle() {
  artist.textContent = current.getAttribute('artist');
  if(current.src.includes('/')) {
    title.textContent = current.src.substr(current.src.lastIndexOf('/')+1).split('%20').join(' ').split('.')[0];
  } 
  else {
    title.textContent = current.src.split('%20').join(' ').split('.')[0];
  }
}

//TIMER FUNCTION
function  timer() {
  slider.value = current.currentTime;
  start.textContent = Math.floor(current.currentTime/60) + ':' + Math.floor(((current.currentTime/60) - Math.floor(current.currentTime/60)) * 60);
  stop.textContent = Math.floor(current.duration/60) + ':' + Math.floor(((current.duration/60) - Math.floor(current.duration/60))* 60);
  autoPlayNext();
}

//PLAY MUSIC
function playAudio() {
  play.style.display = 'none';
  pause.style.display = 'block';
  setInterval(timer, 1000);
  current.play();
  slider.min = 0;
  slider.max = current.duration;
  disc.classList.add('animate');
}

//PAUSE MUSIC
function pauseAudio() {
  play.style.display = 'block';
  pause.style.display = 'none';
  current.pause();
  disc.classList.remove('animate');
}

//STOP MUSIC
function stopAudio() {
  current.pause();
  current.currentTime = 0;
}

//PLAY NEXT MUSIC
function playNext() {
  if(count < musicArray.length - 1){
    stopAudio();
    count += 1;
    current = musicArray[count];
    audioTitle();
    playAudio();
  }
  else{
    stopAudio();
    count = 0;
    current = musicArray[count];
    audioTitle();
    playAudio();
  } 
}

//PLAY PREVIOUS MUSIC
function playPrev() {
  if(count > 0){
    stopAudio();
    count -= 1;
    current = musicArray[count];
    audioTitle();
    playAudio();
  }
  else{
    stopAudio();
    count = 0;
    current = musicArray[count];
  } 
}

//AUTO PLAY NEXT AFTER CURRENT MUSIC ENDS
function autoPlayNext() {
  if(current.currentTime == current.duration) {
    playNext()
  }
}

//MOVE SLIDER
function scrollSlider (e) {
  e.preventDefault();
  current.currentTime = slider.value;
}

//SELECT MUSIC FROM PLAYLIST ON SIDETRAY
function clickMusic (event) {
  stopAudio();
  for(let e of Object.values(playlist)) {
    if(e.includes(event.target.parentElement.getElementsByClassName('title2')[0].innerText)) {
        current = e[1];
    }
  }
  playAudio();
  audioTitle();
}


//ACTION CALLS
audioTitle();
play.addEventListener('click', playAudio);
pause.addEventListener('click', pauseAudio);
next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);
slider.addEventListener('change', scrollSlider);



