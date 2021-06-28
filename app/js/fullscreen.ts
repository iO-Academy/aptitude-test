if (!(document.fullscreenEnabled)) {
    document.getElementById('toggle-fullscreen').classList.add('hide-toggle-fullscreen');
    console.log(document.fullscreenEnabled)
}

const fullscreenButton = document.querySelector('#toggle-fullscreen');
fullscreenButton.addEventListener('click', toggleFullscreen);


function toggleFullscreen() {
    if (!document.fullscreen) {
        document.documentElement.requestFullscreen();
    } document.exitFullscreen()
}


