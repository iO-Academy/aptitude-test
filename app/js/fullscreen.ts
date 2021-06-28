const fullscreenButton = document.querySelector('#toggle-fullscreen');
fullscreenButton.addEventListener('click', toggleFullscreen);

if (!(document.fullscreenEnabled)) {
    fullscreenButton.classList.add('hidden');
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen()
    }
}