/**
 * Takes the Array that has been split up and displays the pagination Buttons on the page.
 * @param paginatedArray
 * @returns {Promise<void>}
 */
async function displayPageBtns(paginatedArray: Array<number>) {
    let pages = Array.from(paginatedArray.keys()).map(page => ({pageNumber: page + 1}));
    let buttonsTemplate = await getTemplateAjax('js/templates/paginationButtons.hbs');
    let template: Function = Handlebars.compile(buttonsTemplate);
    document.querySelector('.pageSelectors').innerHTML = template({pages});
    document.querySelectorAll('.pageBtn')[1].classList.add('active');
}

/**
 * Adds functionality to the page buttons.
 * @param HBTemplate
 * @param paginatedArrays
 */
function pageSelectorFunctionality(HBTemplate: string, paginatedArrays: Array<unknown>) {
    const pages = paginatedArrays.length;
    let page = 1;

    pageButtonCheck(page, pages);

    document.querySelectorAll('.pageBtn').forEach((btn: HTMLButtonElement) => {
        btn.addEventListener('click', (() => {
            document.querySelectorAll('.pageBtn').forEach((allBtn) => {
                allBtn.classList.remove("active")
            });
            if (page > 0 && page <= pages) {
                if (!isNaN(btn.dataset.page as any)) {
                    page = parseInt(btn.dataset.page);
                } else if ((btn.dataset.page === 'next') && (page < pages)) {
                    page++;
                } else if ((btn.dataset.page === 'back') && (page > 1)) {
                    page--;
                }
                document.querySelector(`.pageBtn[data-page="${page}"]`).classList.add('active');
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
function pageButtonCheck(page: number, pages: number) {
    if (pages < 2) {
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

/**
 * Shows or Hides the Pagination Buttons based on the boolean value passed in
 * @param setToHidden boolean that determines if the Page Buttons are to be hidden or not
 */
function showPaginationButtons(setToHidden: boolean) {
    const viewPageButtons = document.querySelector('.pageSelectors');
    if (setToHidden) {
        viewPageButtons.classList.add('hidden');
    }
    else {
        // when there are over 20 users per page, then 4 Page Buttons are displayed (Previous, First Page, Second Page, Last) and in this case we show the whole pageSelectors class which contains those 4 buttons - without this the buttons are still displayed when there are less than 20 users - cannot use logic of number of user rows in table as that will  never be over 20
        let paginationButtonCount = document.querySelectorAll('.pageBtn').length;
        if (paginationButtonCount >= 4) {
            viewPageButtons.classList.remove('hidden');
        }
    }
}