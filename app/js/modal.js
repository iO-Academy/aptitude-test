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

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns {boolean}
 */
function isTimeValid(time) {
    let intTime = parseInt(time)
    return !(intTime <= 1 || intTime == null)
}

/**
 * this is an event listener on the submit button (listens for click), 
 * it sends the object values through our validation functions.
 * If email exists in db then submit is not allowed. If original email 
 * matches current or email does not exist is db then user data is updated.
 */
function addEditModalSubmitEventListener() {
    document.getElementById('editSubmit').addEventListener('click', function() {
        let name = document.getElementById("firstName").value
        let email = document.getElementById("email").value
        let time = document.getElementById('time').value
        let originalEmail = document.getElementById("originalEmail").value
        getExistingUsers().then(function (existingUsers) {
            if (isEmpty(name) &&
                isEmpty(email) &&
                nameValidation(name) &&
                isTimeValid (time) &&
                isEmailValid(email)) {
                if(originalEmail == email || userExists(email, existingUsers) == false){
                    closeDialog()
                    postUserEdit(createObjectForDatabase('.editUserData'))
                    updateUserTable()
                }
            }
        })
    })
}