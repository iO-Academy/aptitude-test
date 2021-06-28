const fullscreenButton = document.querySelector('#toggle-fullscreen');
fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
}
