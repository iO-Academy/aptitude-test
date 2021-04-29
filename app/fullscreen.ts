//window.location == 'questionPage.html'

console.log(window.location)

//document.querySelector('#question_page').requestFullscreen();

export function enterFullScreen() {
    if (window.location.href === 'http://localhost:1234/aptitude-test/app/questionPage.html') {
        document.querySelector('#question_page').requestFullscreen();
    }
}