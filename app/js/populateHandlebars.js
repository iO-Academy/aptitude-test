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
 * Populate handelbars accordion function mirrors the above, but is for 
 * populating the handlebars template specifically for the accordion.
 * @param targetElement the html element to insert handlebars template into
 * @param handlebarsPath the path to where the handlebars template is located
 * @param data the data to insert into handlebars template.
 * @returns {Promise<void>}
 */

async function populateAccordion(targetElement, handlebarsPath, data) {
    let dataToInsert = data
    let HBTemplate = await getTemplateAjax(handlebarsPath)
    let template = Handlebars.compile(HBTemplate)
    document.querySelector(targetElement).innerHTML = template(dataToInsert)
}