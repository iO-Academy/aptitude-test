/**
 * Sorts the array of user objects by their 'dateCreated' with the 
 * newest at the top
 *
 * @return array of user objects in the desired order
 */
async function sortUsersObjectByDate() {

    let usersObject = await createUsersObject()
    console.log(usersObject)
    usersObject.data.sort(function(a, b){
            let dateA = a.dateCreated
            let dateB = b.dateCreated
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