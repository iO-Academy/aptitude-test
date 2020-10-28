/**
 * populates the category dropdowns for the add user
 * and changes user category as selected
 */

function populateCategoryDropdowns () {
    getData('category').then((categoryObject) => {

        getTemplateAjax('js/templates/categoryDropdown.hbs').then((HBTemplate) => {
            let template: Function = Handlebars.compile(HBTemplate);
            document.querySelector<HTMLElement>('#category_id').innerHTML = template(categoryObject);
        });

    });
}