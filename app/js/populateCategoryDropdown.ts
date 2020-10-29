/**
 * populates the category dropdown for the table
 */
function populateTableCategoryDropdown () {
    getData('category').then((testsObject) => {
        getTemplateAjax('js/templates/categoryFilter.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#categoryFilter').innerHTML = template(testsObject);
        });
    })
}

/**
 * populates the category dropdown for the new user section
 */
function populateNewUserCategoryDropdown () {
    getData('category').then((testsObject) => {
        getTemplateAjax('js/templates/categoryDropdown.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#category_id').innerHTML = template(testsObject);
        });
    })
}