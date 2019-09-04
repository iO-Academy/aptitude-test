/**
 * Sorts the array of user objects by their 'dateCreated' with the 
 * newest at the top
 *
 * @return array of user objects in the desired order
 */
async function sortUsersObjectByDate() {
    let usersObject = await createUsersObject()
    usersObject.data.sort(function(a, b) {
        let dateA = new Date(a.dateCreated)
        let dateB= new Date(b.dateCreated)
        return dateB - dateA //sort by date descending
    })
    return usersObject
}

/**
 * Get the handlebars template for table rows (mergeTable.hbs), combine 
 * with user objects and send this to searching and filtering.
 */
function updateScoreTable() {
    let users = sortUsersObjectByDate()
    users.then(function (userInfo) {
        getTemplateAjax('js/templates/mergeTable.hbs').then(function (HBTemplate) {
            sendToSearchAndFilter(HBTemplate, userInfo)
        })
    })
}

/**
 * Sends the user info to the search and filtering function
 */
function sendToSearchAndFilter(template, userInfo) {
    let userArray = []
    userInfo.data.forEach(function (scoreUser) {
        userArray.push(scoreUser)
    })
    searchAndFilter(template, userArray)
}

/**
 * Checks the length of an array of data objects. 
 * If greater than 0, calls function to print them to the table
 * If 0, gives 'no valid results message'
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataArray an array of data objects returned from the API 
 * and filtered by user settings
 */
function printFilteredResultsToScreen(HBTemplate, scoresDataArray) {
    if (scoresDataArray.length < 1) {
        let score_list = document.querySelector('.score_list')
        score_list.innerHTML = ''
        score_list.innerHTML = 'No results!'
    } else {
        produceTable(HBTemplate,{data: scoresDataArray})
    }
}

/**
 * Turns data from parent element (userTable handlebars template) into an object.
 *
 * @param event is the event fired off by the function
 */
function createObjectFromParentElement(event) {
    let parentElement = event.target.parentElement
    let userInfo = {}
    userInfo.name = parentElement.getAttribute("dataName")
    userInfo.email = parentElement.getAttribute("dataEmail")
    userInfo.id = parentElement.getAttribute("dataId")
    userInfo.time = parentElement.getAttribute("dataTime")
    userInfo.canRetake = parseInt(parentElement.getAttribute("dataCanRetake"))
    return userInfo
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
 * Adds event listener to the edit buttons.
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
 * Adds event listener to the delete buttons.
 */
function addDeleteEventListeners() {
    let userItems = document.querySelectorAll(".btn-danger")
    //console.log(userItems)
    userItems.forEach(function (userItem) {
        userItem.addEventListener('click', function (e) {
            let userId = e.target.parentElement.getAttribute("dataId")
            deleteUser(userId)
        })
    })
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

/**
 * Sends the API call to delete a user with the specified ID
 *
 * @param userId 
 */
function deleteUser(userId) {
    let url = "http://localhost:8080/user/delete/" + userId
    fetch(url, {"method": "post"})
        .then(function () {
            updateScoreTable()
        })
}

/**
 * Compiles the data object with the handlebars template
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataObject an array of data objects returned from the API 
 * and filtered by user settings
 */
function produceTable (HBTemplate, scoresDataObject) {
    let template = Handlebars.compile(HBTemplate)
    let score_list = document.querySelector(".score_list")
    score_list.innerHTML = ""
    let html = template(scoresDataObject)
    score_list.innerHTML += html

    addEditEventListeners()
    addDeleteEventListeners()
}

updateScoreTable()