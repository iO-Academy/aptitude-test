if (!(document.fullscreenEnabled)) {
    document.getElementById('toggle-fullscreen').classList.add('hide-toggle-fullscreen');
}

const fullscreenButton = document.querySelector('#toggle-fullscreen');
fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
}