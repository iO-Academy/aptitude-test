/**
 * Function sortUsersObjectByDate sorts an array of objects by their 'dateCreated' in descending order (newest at the top)
 *
 * @return array of Objects is the array but in the correct order
 */
async function sortUsersObjectByDate() {
    let testUserData = await createUsersObject()
    await testUserData.data.sort(function(a, b){
        var dateA = new Date(a.dateCreated), dateB=new Date(b.dateCreated)
        return dateB - dateA //sort by date descending
    })
    return await testUserData
}

/**
 * get the handlebars template (scoreTable.hbs) and add userInfo (Email, Name and Scores) to the template
 */
function updateScoreTable() {
    let users = sortUsersObjectByDate()

    users.then(function (userInfo) {
        getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
            fillScoreTable(HBTemplate, userInfo)
        })
    })
}

/**
 * fills handlebars template by passing in object and inserts into the score_list div and checks for deleted
 * in database
 *
 * @param HBTemplate the handlebars template
 * @param ObjFunction the function that creates an object of all fields required in scores page
 */
function fillScoreTable(HBTemplate, userInfo) {
    fetch("http://localhost:8080/user")
        .then(function (result) {
            return result.json()
        })
        .then(function (result) {
            let resultArray = []
            result.data.forEach(function (existingUser) {
                if (existingUser.deleted != 1) {
                    userInfo.data.forEach(function (scoreUser) {
                        if (scoreUser.email === existingUser.email) {
                            resultArray.push(scoreUser)
                        }
                    })
                }
            })
            return resultArray
        })
        .then(searchAndFilter(resultArray))
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
>>>>>>> story2SearchResults
}

function produceTable (HBTemplate, scoresDataObject) {
    let template = Handlebars.compile(HBTemplate)
    let score_list = document.querySelector(".score_list")
    score_list.innerHTML = ""
    let html = template(scoresDataObject)
    score_list.innerHTML += html
    }

updateScoreTable()