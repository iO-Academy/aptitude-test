/**
 * Populate handlebars template
 *
 * @param targetElement the html element to insert handlebars template into
 * @param handlebarsPath the path to where the handlebars template is located
 * @param APIpath the API path
 * @returns {Promise<void>}
 */
async function populateHandlebars(targetElement, handlebarsPath, APIpath) {
    let dataToInsert = await getData(APIpath);
    let HBTemplate = await getTemplateAjax(handlebarsPath);
    let template = Handlebars.compile(HBTemplate);
    let score_list = document.querySelector(targetElement);

    if (dataToInsert.data.length < 1) {
        score_list.innerHTML = 'No results!';
    } else {
        score_list.innerHTML = template(dataToInsert);
    }
}
