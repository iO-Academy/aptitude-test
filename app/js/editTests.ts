const testId = location.hash.replace('#', '');

function populateQuestions(testId: string) {
    populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', `question?test_id=${testId}`).then(() => {
        document.querySelectorAll(".delete-question").forEach((btn) => {
            btn.addEventListener('click', async (clickedBtn: any) => {
                const {id} = clickedBtn.target.parentElement.dataset;
                const responseMsg = document.querySelector<HTMLElement>('#error');
                let response = await deleteQuestion(id);

                ajaxResponseCheck(response.success, response.message, responseMsg, false);
                location.reload();
            });
        });

        document.querySelectorAll(".edit-question").forEach((btn) => {
            btn.addEventListener('click', async (clickedBtn: any) => {
                const {id} = clickedBtn.target.parentElement.dataset;

                window.location.href = `editQuestion.html#${id}`;
            });
        });
    });
}


populateHandlebars('#filterTests', 'js/templates/testAllocatedFilter.hbs', 'test').then(() => {
    document.querySelector<HTMLInputElement>('#filterTests').value = testId;
    document.querySelector('#filterTests').addEventListener('change', (testFilter: any) => {
        const filteredTestId = testFilter.target.value;

        window.location.href = `editTests.html#${filteredTestId}`;
        document.querySelector('.tableBody').innerHTML = "";
        populateQuestions(filteredTestId);
    });
});

populateQuestions(testId);



