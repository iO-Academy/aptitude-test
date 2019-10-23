/**
 * Populate handlebars template
 *
 * @param targetElement the html element to insert handlebars template into
 * @param handlebarsPath the path to where the handlebars template is located
 * @param APIpath the API path
 * @returns {Promise<void>}
 */
async function populateHandlebars(targetElement, handlebarsPath, APIpath) {
    let dataToInsert = await getData(APIpath)
    let HBTemplate = await getTemplateAjax(handlebarsPath)
    let template = Handlebars.compile(HBTemplate)
    document.querySelector(targetElement).innerHTML = template(dataToInsert)
}

/**
 * Same function as above but passes in an object instead of an API Path
 * Used in populating edit question dialog
 */

async function populateHandlebarsObject(targetElement, handlebarsPath, data) {
    let dataToInsert = data
    let HBTemplate = await getTemplateAjax(handlebarsPath)
    let template = Handlebars.compile(HBTemplate)
    document.querySelector(targetElement).innerHTML = template(dataToInsert)
}






