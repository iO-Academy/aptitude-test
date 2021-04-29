/**
 * Function to populate the categories section on the Admin page, adds event listeners to delete buttons once populated
 */
function populateCategories() {
    document.querySelector('#categoriesContainer').innerHTML = '';
    populateHandlebars('#categoriesContainer', 'js/templates/categoryItem.hbs', 'category')
        .then(() => {
            document.querySelectorAll('.deleteCategory').forEach((button: HTMLElement) => {
                button.addEventListener('click', async(clickedBtn: MouseEvent) => {
                    const button = clickedBtn.target as HTMLButtonElement
                    const id = parseInt(button.dataset.id);
                    openDialog()
                    createDeleteModal(id, 'category')
                })
            })
        })
}

populateCategories();

