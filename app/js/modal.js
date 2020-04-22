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
    document.querySelector('#modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none'
}

/**
 * Creates the modal with editModal handlebars template. 
 * Then calls function to fill modal fields with the users' data.
 * Then adds the submit button's event listener.
 * @param userInfo Object containing info of the user to edit.
 */
function createEditModal(userInfo) {
    getTemplateAjax('js/templates/editmodal.hbs').then(function (HBTemplate) {
        fillEditModalFields(HBTemplate, userInfo);
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
    let template = Handlebars.compile(HBTemplate);
    let modal_content = document.querySelector("#modal-content");

    modal_content.innerHTML = "";

    if (userInfo.name && userInfo.email && userInfo.id && userInfo.timeMinutes && userInfo.timeSeconds) {
        let html = template(userInfo);
        modal_content.innerHTML += html;
    } else {
        modal_content.innerHTML = "Please contact Admin, user list unavailable";
    }
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeTotalValid(time) {
    let intTime = parseInt(time);
    return (intTime > 0 && intTime <= 3600);
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeMinutesValid(time) {
    let intTime = parseInt(time);
    return (intTime > 0 && intTime <= 60);
}

/**
 * Takes time and returns true if passed validation or false otherwise.
 * @param time
 * @returns boolean
 */
function isTimeSecondsValid(time) {
    let intTime = parseInt(time);
    return (intTime > 0 && intTime < 60);
}


/**
 * this is an event listener on the submit button (listens for click), 
 * it sends the object values through our validation functions.
 * If email exists in db then submit is not allowed. If original email 
 * matches current or email does not exist is db then user data is updated.
 */
function addEditModalSubmitEventListener() {
    document.querySelector('#editSubmit').addEventListener('click', function() {
        let name = document.querySelector("#firstName").value;
        let email = document.querySelector("#email").value;
        let timeMinutes = document.querySelector('#userMinutes').value;
        let timeSeconds = document.querySelector('#userSeconds').value;
        let timeTotal = document.querySelector('#time');
        let originalEmail = document.querySelector("#originalEmail").value;
        let errorField = document.querySelector('#modal_error');

        timeTotal.value = parseInt(timeMinutes * 60) + parseInt(timeSeconds);

        getExistingUsers().then(function (existingUsers) {
            if (isEmpty(name) &&
                isEmpty(email) &&
                nameValidation(name) &&
                isTimeTotalValid(timeTotal.value) &&
                isTimeMinutesValid(timeMinutes) &&
                isTimeSecondsValid(timeSeconds) &&
                isEmailValid(email)) {
                if(originalEmail == email || userExists(email, existingUsers) == false) {
                    errorField.innerHTML = '';
                    errorField.classList.add('alert-success');
                    errorField.classList.remove('alert-danger');
                    closeDialog();
                    postUserEdit(createObjectForDatabase('.editUserData'));
                    updateScoreTable()
                } else {
                    errorField.classList.remove('alert-success');
                    errorField.classList.add('alert-danger');
                    errorField.innerHTML = "Your email is not valid or already exists: Please provide a correct email";
                }
            } else {
                errorField.classList.remove('alert-success');
                errorField.classList.add('alert-danger');
                errorField.innerHTML = 'Test duration must be below an hour and minutes and seconds must be between 0 and 60.';
            }
        })
    })
}