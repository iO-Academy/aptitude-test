/** 
 * Opens the modal dialog box.
 */
function openDialog() {
    document.querySelector('#modal').style.display = 'block'
    document.querySelector('.overlay').style.display = 'block'
}

/**
 * Closes the modal dialog box.
 */
function closeDialog() {
    document.querySelector('#modal').style.display = 'none'
    document.querySelector('.overlay').style.display = 'none'
}

/**
 * Fills the input fields in the edit modal with the current data for the user stored in the api.
 *
 * @param HBTemplate the handlebars template.
 *
 * @param userInfo the object of all fields required in scores page.
 *
 */
function fillEditModal(HBTemplate, userInfo) {
    let template = Handlebars.compile(HBTemplate)
    let modal_content = document.querySelector("#modal-content")

    modal_content.innerHTML = ""

    if (userInfo.name && userInfo.email && userInfo.id && userInfo.time) {
        let html = template(userInfo)
        modal_content.innerHTML += html
    } else {
        modal_content.innerHTML = "Please contact Admin, user list unavailable"
    }
}


/**
 * Populates the modal with editModal handlebars template, 
 * and puts userInfo object into that template and triggers
 * addEditModalSubmitEventListener.
 *
 * @param userInfo
 */
function populateEditModal(userInfo) {
    console.log('populating edit modal')
    getTemplateAjax('js/templates/editmodal.hbs').then(function (HBTemplate) {
        fillEditModal(HBTemplate, userInfo)
    }).then(addEditModalSubmitEventListener)
}