populateHandlebars('.tableBody', 'js/templates/questionTable.hbs', 'question').then(() => {
    document.querySelectorAll(".delete-question").forEach((btn) => {
        btn.addEventListener('click', async (clickedBtn) => {
            const id = clickedBtn.target.parentElement.dataset.id;
            await deleteQuestion(id);
            location.reload();
        })
    });
});


