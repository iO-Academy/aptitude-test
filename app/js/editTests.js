const testId = location.hash.replace('#', '');

function populateQuestions(testId) {
    populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', `question?test_id=${testId}`).then(() => {
        document.querySelectorAll(".delete-question").forEach((btn) => {
            btn.addEventListener('click', async (clickedBtn) => {
                const {id} = clickedBtn.target.parentElement.dataset;
                await deleteQuestion(id);
                location.reload();
            });
        });

        document.querySelectorAll(".edit-question").forEach((btn) => {
            btn.addEventListener('click', async (clickedBtn) => {
                const {id} = clickedBtn.target.parentElement.dataset;

                window.location.href = `editQuestion.html#${id}`;
            });
        });
    });
}


populateHandlebars('#filterTests', 'js/templates/testAllocatedFilter.hbs', 'test').then(() => {
    document.querySelector('#filterTests').value = testId;
    document.querySelector('#filterTests').addEventListener('change', (testFilter) => {
        const {filteredTestId} = testFilter.target;

        window.location.href = `editTests.html#${filteredTestId}`;
        document.querySelector('.tableBody').innerHTML = "";
        populateQuestions(filteredTestId);
    });
});

populateQuestions(testId);



