import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';


player.on('timeupdate', throttle(onSaveStorage, 1000));

function onSaveStorage(event) {
    localStorage.setItem(CURRENT_TIME, event.seconds);

    if (event.seconds === event.duration) {
        localStorage.removeItem(CURRENT_TIME)
    }
}

setCurrentTime();

function setCurrentTime() {
    const saveTime = localStorage.getItem(CURRENT_TIME);
    if (saveTime) {
        player.setCurrentTime(saveTime);
    }
}

