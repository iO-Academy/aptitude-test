// Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
//     
//     if( lvalue!=rvalue ) {
//         return options.inverse(this);
//     } else {
//         return options.fn(this);
//     }
// });

// {{#equal lvalue rvalue}}
// {{/equal}}

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
 * Then calls function to fill modal fields with the users' data.
 * Then adds the submit button's event listener.
 * @param userInfo Object containing info of the user to edit.
 */
function createEditModal(userInfo, tests) {
    infoForTemplate={
        tests: tests,
        user: userInfo,
        defaultTest: {}
    }

    infoForTemplate.tests.forEach(test => {
        let index = infoForTemplate.tests.indexOf(test)
        if(test.id == infoForTemplate.user.dataTestId){
            infoForTemplate.defaultTest = test
            infoForTemplate.tests.splice(index, 1)
        }
        console.log(infoForTemplate.defaultTest)
    });

    getTemplateAjax('js/templates/editmodal.hbs').then(function (HBTemplate) {
        fillEditModalFields(HBTemplate, infoForTemplate)
    })
    .then(() => {
        addEditModalSubmitEventListener()
    })
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
    if (userInfo.user.name && userInfo.user.email && userInfo.user.id && userInfo.user.time) {
        let html = template(userInfo)
        modal_content.innerHTML += html
    } else {
        modal_content.innerHTML = "Please contact Admin, user list unavailable"
    }
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
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
                if(originalEmail == email || userExists(email, existingUsers) == false) {
                    closeDialog()
                    postUserEdit(createObjectForDatabase('.editUserData'))
                    updateScoreTable()
                }
            }
        })
    })
}