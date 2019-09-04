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
 * Creates the modal with editModal handlebars template. 
 * and puts userInfo object into that template and adds
 * addEditModalSubmitEventListener.
 * @param userInfo
 */
function createEditModal(userInfo) {
    console.log('populating edit modal')
    getTemplateAjax('js/templates/editmodal.hbs').then(function (HBTemplate) {
        fillEditModalFields(HBTemplate, userInfo)
    }).then(addEditModalSubmitEventListener)
}

/**
 * Fills the input fields in the edit modal with the current data of the 
 * user to be edited.
 * @param HBTemplate the handlebars template.
 * @param userInfo the object of all fields required in scores page.
 */
function fillEditModalFields(HBTemplate, userInfo) {
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