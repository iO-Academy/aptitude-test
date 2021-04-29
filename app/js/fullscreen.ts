
const fullscreenButton = document.querySelector('#toggle-fullscreen');
fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreen) {
        document.documentElement.requestFullscreen();
    } document.exitFullscreen()
}
