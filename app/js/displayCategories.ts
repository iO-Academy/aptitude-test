function populateCategories() {
    document.querySelector('#categoriesContainer').innerHTML = '';
    populateHandlebars('#categoriesContainer', 'js/templates/categoryItem.hbs', 'category')
        .then(() => {
            document.querySelectorAll('.deleteCategory').forEach((button: HTMLElement) => {
                button.addEventListener('click', async(clickedBtn: any) => {
                    const id = clickedBtn.target.dataset.id;
                    let response = await deleteCategory(id);
                    if (response) {
                        document.querySelector('#categoriesContainer').innerHTML = '';
                        populateCategories();
                    }
                })
            })
        })
}

populateCategories();