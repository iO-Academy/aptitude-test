/**
 * This function toggles .hidden on the graph and table.
 * It also toggles the class on the buttons to display the button with the correct text on it.
 *
 */
function toggleGraphDisplay(e: Event) {
    e.preventDefault();
    let graphOnPage = document.querySelector('.show-graph');
    graphOnPage.classList.toggle('hidden');
    let tableOnPage = document.querySelector('#applicantTable');
    tableOnPage.classList.toggle('hidden');
    let viewGraphButton =document.querySelector('#viewGraph');
    viewGraphButton.classList.toggle('hidden');
    let viewTableButton = document.querySelector('#viewTable');
    viewTableButton.classList.toggle('hidden');
}

var displayGraphButton = document.querySelector('#viewGraph');
displayGraphButton.addEventListener('click', (e) => {
    toggleGraphDisplay(e);
    showPaginationButtons(true); 
});

var displayTableButton = document.querySelector('#viewTable');
displayTableButton.addEventListener('click', (e) => {
    toggleGraphDisplay(e);
    showPaginationButtons(false);
});