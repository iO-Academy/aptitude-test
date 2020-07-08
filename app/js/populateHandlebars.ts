/**
 * Populate handlebars template
 *
 * @param targetElement the html element to insert handlebars template into
 * @param handlebarsPath the path to where the handlebars template is located
 * @param APIpath the API path
 * @returns {Promise<void>}
 */
async function populateHandlebars(targetElement: string, handlebarsPath: string, APIpath: string) {
    let dataToInsert = await getData(APIpath);
    let HBTemplate = await getTemplateAjax(handlebarsPath);
    let template: Function = Handlebars.compile(HBTemplate);
    let score_list = document.querySelector(targetElement);

    if (dataToInsert.data.length < 1) {
        score_list.innerHTML = 'No results!';
    } else {
        score_list.innerHTML = template(dataToInsert);
    }
}
