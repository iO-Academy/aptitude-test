/**
 * populates the category dropdowns for the table
 */
function populateCategoryDropdown () {
    getData('category').then((testsObject) => {
        getTemplateAjax('js/templates/categoryFilter.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#categoryFilter').innerHTML = template(testsObject);
        });
        getTemplateAjax('js/templates/categoryDropdown.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#category_id').innerHTML = template(testsObject);
        });
    })
}