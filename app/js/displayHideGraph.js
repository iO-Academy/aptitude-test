function displayGraph() {
    let graphOnPage = document.querySelector('.show-graph');
    graphOnPage.classList.remove('hidden');
    let tableOnPage = document.querySelector('.user-score-table');
    tableOnPage.classList.add('hidden');
}

function displayTable() {
    let graphOnPage = document.querySelector('.show-graph');
    graphOnPage.classList.add('hidden');
    let tableOnPage = document.querySelector('.user-score-table');
    tableOnPage.classList.remove('hidden');
}

