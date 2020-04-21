const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const testId = urlParams.get('test_id') || 1;

populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', `question?test_id=${testId}`).then(() => {
    document.querySelectorAll(".delete-question").forEach((btn) => {
        btn.addEventListener('click', async (clickedBtn) => {
            const { id } = clickedBtn.target.parentElement.dataset;
            await deleteQuestion(id);
            location.reload();
        });
    });

    document.querySelectorAll(".edit-question").forEach((btn) => {
        btn.addEventListener('click', async (clickedBtn) => {
            const { id } = clickedBtn.target.parentElement.dataset;

            window.location.href = `editQuestion.html#${id}`;
        });
    });
});


populateHandlebars('#filterTests', 'js/templates/testAllocatedFilter.hbs', 'test').then(() => {
    document.querySelector('#filterTests').value = testId;
    document.querySelector('#filterTests').addEventListener('click', (testFilter) => {
        const {id} = testFilter.target.dataset;
        window.location.href = `editTests.html?test_id=${id}`;
        document.querySelector('.tableBody').innerHTML = "";
        populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', `question?test_id=${id}`)
    })
});



