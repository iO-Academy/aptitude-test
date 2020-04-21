
function toggleGraphDisplay() {
    let graphOnPage = document.querySelector('.show-graph');
    graphOnPage.classList.toggle('hidden');
    let tableOnPage = document.querySelector('.user-score-table');
    tableOnPage.classList.toggle('hidden');
}

var displayButton = document.querySelector('#viewGraph')
displayButton.addEventListener ('click', function(e) {
    e.preventDefault();
    toggleGraphDisplay();
});
