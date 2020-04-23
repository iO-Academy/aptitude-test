/**
 * Takes the Array that has been split up and displays the pagination Buttons on the page.
 * @param paginatedArray
 * @returns {Promise<void>}
 */
async function displayPageBtns(paginatedArray) {
    let pages = Array.from(paginatedArray.keys()).map(page => ({pageNumber: page + 1}));
    let buttonsTemplate = await getTemplateAjax('js/templates/paginationButtons.hbs');
    let template = Handlebars.compile(buttonsTemplate);
    document.querySelector('.pageSelectors').innerHTML = template({pages});
    pageSelectorFunctionality();
}

function pageSelectorFunctionality() {
    document.querySelectorAll('.pageBtn').forEach((btn) => {
        btn.addEventListener('click', (evt => {
            let page = btn.dataset.page;
            console.log(page)
        }))
    })
}