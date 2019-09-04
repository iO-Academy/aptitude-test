/**
 * Function sortUsersObjectByDate sorts an array of objects by their 'dateCreated' in descending order (newest at the top)
 *
 * @return array of Objects is the array but in the correct order
 */
async function sortUsersObjectByDate() {
    let testUserData = await createUsersObject()
    console.log(testUserData)
    await testUserData.data.sort(function(a, b){
        var dateA = new Date(a.dateCreated), dateB=new Date(b.dateCreated)
        return dateB - dateA //sort by date descending
    })
    return await testUserData
    console.log(testUserData)

}

/**
 * get the handlebars template (scoreTable.hbs) and add userInfo (Email, Name and Scores) to the template
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
    console.log('userarray')
    console.log(userArray)
    searchAndFilter(template, userArray)
}

/**
 * Checks the length of an array of data objects, if greater than 0 calls function to print to screen, if 0, gives 'no valid results message'
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataArray an array of data objects returned from the API and filtered by user settings
 *
 * @returns Void Sends results to produceTablefunction to print table to screen, or prints no results found message
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
 * Compiles the data object with the handlebars template to display in browser
 *
 * @param HBTemplate the handlebars template for creating a table of results
 * @param scoresDataObject an array of data objects returned from the API and filtered by user settings
 *
 * @returns void
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