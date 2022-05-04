/**
 * populates the category dropdown for the table
 */
function populateTableCategoryDropdown () {
    if (!getCookie('access')) {
        getData('category').then((testsObject) => {
            getTemplateAjax('js/templates/categoryFilter.hbs').then((HBTemplate) => {
                let template: Function = Handlebars.compile(HBTemplate);
                document.querySelector<HTMLElement>('#categoryFilter').innerHTML = template(testsObject);
            });
        })
    }
}

/**
 * populates the category dropdown for the new user section
 */
function populateNewUserCategoryDropdown () {
    getData('category').then((testsObject) => {
        getTemplateAjax('js/templates/categoryDropdown.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#category_id').innerHTML = template(testsObject);
            if (getCookie('access')) {
                const access = getCookie('access')
                document.querySelectorAll<any>('#category_id option').forEach(option => {
                    if (option.value !== access) {
                        option.remove()
                    } else {
                        option.selected = true
                    }
                })
            }
        });
    })
}