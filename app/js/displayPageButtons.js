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
}

/**
 * Adds functionality to the page buttons.
 * @param HBTemplate
 * @param paginatedArrays
 */
function pageSelectorFunctionality(HBTemplate, paginatedArrays) {
    const pages = paginatedArrays.length;
    let page = 1;

    pageButtonCheck(page, pages);

    document.querySelectorAll('.pageBtn').forEach((btn) => {
        btn.addEventListener('click', (() => {
            if (page > 0 && page <= pages) {
                if (!isNaN(btn.dataset.page)) {
                    page = parseInt(btn.dataset.page);
                } else if ((btn.dataset.page === 'next') && (page < pages)) {
                    page++;
                } else if ((btn.dataset.page === 'back') && (page > 1)) {
                    page--;
                }
            }

            printFilteredResultsToScreen(HBTemplate, paginatedArrays[page - 1]);
            pageButtonCheck(page, pages);
        }));
    });
}


/**
 * Checks if the next or previous buttons are required for the page.
 * @param page
 * @param pages
 */
function pageButtonCheck(page, pages) {
    if (pages === 1) {
        document.querySelector('.pageSelectors').classList.add('hidden');
    } else {
        document.querySelector('.pageSelectors').classList.remove('hidden');
        if (page === 1) {
            document.querySelector('.backBtn').classList.add('greyedOutBtn');
        } else {
            document.querySelector('.backBtn').classList.remove('greyedOutBtn');
        }

        if (page === pages) {
            document.querySelector('.nextBtn').classList.add('greyedOutBtn');
        } else {
            document.querySelector('.nextBtn').classList.remove('greyedOutBtn');
        }
    }
}
