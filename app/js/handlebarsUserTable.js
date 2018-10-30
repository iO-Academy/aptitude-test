/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
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
 *this fills the handlebars template with users that have not been soft deleted
 *
 * @param apiResponse
 * @param template
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
        addDeleteEventListeners()
    } else {
        user_list.innerHTML = "Please contact Admin, user list unavailable"
    }
}

/**
 * this adds the event listener to the delete button on creation of it the button
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
 * get the handlebars template and use this to display the users
 */
function updateUserTable() {
    getTemplateAjax('js/templates/userTable.hbs').then(function (HBTemplate) {
        fillUserTable(HBTemplate)
    })
}

// This asynchronous function accepts a numeric id as a parameter which is unique to each user
// it then posts the delete line and changes the entry in the database from a zero to a one.
//if succesful the function deletes teh innerHTML of the parent element (as if it is actually deleted) and console logs
// deletion succesful.
function deleteUser(userId) {
    let url = "http://localhost:8080/user/delete/" + userId
    fetch(url, {"method": "post"})
        .then(function () {
            updateUserTable()
        })
}

updateUserTable()