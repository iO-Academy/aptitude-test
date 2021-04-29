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

/**
 * gives the ability to change the category in the category dropdown
 */
function changeNewUserCategoryDropdown() {
    getData('category').then(function (testsObject) {
        getTemplateAjax('js/templates/categoryDropdown.hbs').then(function (HBTemplate) {
            let template = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#changeCategory').innerHTML = template(testsObject)
        });
    });
}