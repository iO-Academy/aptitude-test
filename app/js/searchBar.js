
document.getElementById("searchSubmit").addEventListener("click", function () {
    let search = document.getElementById("search")
    getExistingUsers().then(function (exitingUsers) {
        let result = []
        exitingUsers.forEach(function (user) {
            if(search.value == user.name || search.value == user.email){
                result.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    score: user.score,
                    percentage: user.percentage,
                    time: user.time
                })
            }
        })
        updateSearchResultsTable({data: result})
    })
})

/**
 * get the handlebars template (scoreTable.hbs) and add userInfo (Email, Name and Scores) to the template
 */
function updateSearchResultsTable(results) {
    getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
        fillSearchResultsTable(HBTemplate, results)
    })
}

/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillSearchResultsTable(HBTemplate, results) {
    let template = Handlebars.compile(HBTemplate)

    updateDisplayedSearchResults(results, template)
}

function updateDisplayedSearchResults(result, template) {
    let search_result = document.querySelector("searchResults")

    let html = template(result)
    search_result.innerHTML += html

}

