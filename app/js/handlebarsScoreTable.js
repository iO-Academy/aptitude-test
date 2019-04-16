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
            let newResultArray = []
            result.data.forEach(function (existingUser) {
                if (existingUser.deleted != 1) {
                    userInfo.data.forEach(function (scoreUser) {
                        if (scoreUser.email === existingUser.email) {
                            newResultObject.push(scoreUser)
                        }
                    })
                }
            })
            return newResultArray
        })
        .then(searchAndFilter(newResultArray))
}

updateScoreTable()