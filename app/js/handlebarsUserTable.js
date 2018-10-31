/**
 * Fills handlebars template by getting the user data from the api and inserts into the user_list div.
 *
 * @param HBTemplate the handlebars template.
 *
 */
function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/user")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            updateDisplayedUsers(result, template)
        })
}

/**
 * This fills the handlebars template with users that have not been soft deleted.
 *
 * @param apiResponse is the data object retrieved from the api
 *
 * @param template is the hbs template that the user table is updated from
 *
 */
function updateDisplayedUsers(apiResponse, template) {
    let user_list = document.querySelector(".user_list")
    user_list.innerHTML = ""
    if (apiResponse.success) {
        apiResponse.data.forEach(function(userData) {
            if (userData.deleted === "0") {
                let html = template(userData)
                user_list.innerHTML += html
            }
        })
        addEditEventListeners()
        addDeleteEventListeners()
    } else {
        user_list.innerHTML = "Please contact Admin, user list unavailable"
    }
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

    if (userInfo.name && userInfo.email && userInfo.id) {
        let html = template(userInfo)
        modal_content.innerHTML += html
    } else {
        modal_content.innerHTML = "Please contact Admin, user list unavailable"
    }
}

/**
 * This adds the event listeners to the created edit buttons.
 *
 */
function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn")
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function (e) {
            openDialog()
            let userInfo = createObjectFromParentElement(e)
            populateEditModal(userInfo)
        })
    })
}

/**
 * Turns data from parent element (userTable handlebars template) into an object.
 *
 */
function createObjectFromParentElement(event) {
    let parentElement = event.target.parentElement
    let userInfo = {}
    userInfo.name = parentElement.getAttribute("dataName")
    userInfo.email = parentElement.getAttribute("dataEmail")
    userInfo.id = parentElement.getAttribute("dataId")
    return userInfo
}

/**
 * Populates the modal with editModal handlebars template and puts userInfo object into that template and triggers off
 * addEditModalSubmitEventListener.
 *
 */
function populateEditModal(userInfo) {
    getTemplateAjax('js/templates/editmodal.hbs').then(function (HBTemplate) {
        fillEditModal(HBTemplate, userInfo)
    }).then(addEditModalSubmitEventListener)
}
/**
 * This adds the event listener to the delete button on creation of it the button.
 *
 */
function addDeleteEventListeners() {
    let userItems = document.querySelectorAll(".btn-danger")
    userItems.forEach(function (userItem) {
        userItem.addEventListener('click', function (e) {
            let userId = e.target.parentElement.getAttribute("dataId")
            deleteUser(userId)
        })
    })
}

/**
 * Get the handlebars template and use this to display the users.
 *
 */
function updateUserTable() {
    getTemplateAjax('js/templates/userTable.hbs').then(function (HBTemplate) {
        fillUserTable(HBTemplate)
    })
}
/**
 * This asynchronous function accepts a numeric id as a parameter which is unique to each user.
 * It then posts the delete line and changes the entry in the database from a zero to a one.
 * if successful calls the updateUserTable() function
 *
 * @param This brings in the id of the user where the delete button has been clicked
 */
function deleteUser(userId) {
    let url = "http://localhost:8080/user/delete/" + userId
    fetch(url, {"method": "post"})
        .then(function () {
            updateUserTable()
        })
}

updateUserTable()