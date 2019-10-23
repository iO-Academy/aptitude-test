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
 * populating the handlebars template specifically for the accordion
 */



async function populateHandlebarsAcc(targetElement, handlebarsPath) {
    var data = {
        tests: {
        testname1: [
            {username: 'dan', score: 100},
            {username: 'haz', score: 100},
            {username: 'nick', score: 60}],
        testname2: [
            {username: 'fan', score: 100},
            {username: 'paz', score: 100},
            {username: 'dick', score: 60}
        ]
        }
    }
    let HBTemplate = await getTemplateAjax(handlebarsPath)
    let template = Handlebars.compile(HBTemplate)
    document.querySelector(targetElement).innerHTML = template(data)
}

// async function populateHandlebarsAcc(targetElement, handlebarsPath) {
//     let dataToInsert = await accordionTesting()
//     let HBTemplate = await getTemplateAjax(handlebarsPath)
//     let template = Handlebars.compile(HBTemplate)
//     document.querySelector(targetElement).innerHTML = template(dataToInsert)
// }
