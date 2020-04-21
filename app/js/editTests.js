populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', 'question').then(() => {
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


