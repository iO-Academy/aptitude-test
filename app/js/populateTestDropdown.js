/**
 * Populates dropdown menu of available tests
 *
 * @returns {Promise<void>}
 */
async function populateTestDropdown() {
    let availableTests = await getData('test')
    let HBTemplate = await getTemplateAjax('js/templates/testDropdown.hbs')
    let template = Handlebars.compile(HBTemplate)
    document.querySelector('#test_id').innerHTML = template(availableTests)
}

populateTestDropdown()
