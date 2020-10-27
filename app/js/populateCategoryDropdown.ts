/**
 * populates the category dropdowns for the table
 */
function populateCategoryDropdown () {
    getData('category').then((testsObject) => {
        getTemplateAjax('js/templates/categoryFilter.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            console.log(template(testsObject));
            document.querySelector<HTMLElement>('#categoryFilter').innerHTML = template(testsObject);
        });
    })
}