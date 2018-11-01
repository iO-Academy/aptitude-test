
document.getElementById("searchReset").addEventListener("click",function () {
    let currentResult = document.querySelectorAll(".scoreEntry")
    currentResult.forEach(function (element) {
        element.style.display = "block"
    })
})

document.getElementById("searchSubmit").addEventListener("click", function () {
    getExistingUsers().then(function (existingUsers) {
        matchExistingUsersBySearchTerm(existingUsers)
    })
})

/**
 * sanitises the search and creates and object dependent on your search
 *
 * @param existingUsers - all users that arent deleted
 *
 * @return result - and object containing info of the searched user
 */
function matchExistingUsersBySearchTerm(existingUsers) {
    let search = document.getElementById("search")
    let result = []
    existingUsers.forEach(function (user) {
        if(nameValidation(search.value)) {
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
        searchResults(result)
    }
    })
}

/**
 * gets the user id and current object id and then displays the object id that matches the searched object id
 *
 * @param result - object of terms searched
 *
 * @return object - containing the user results
 */
function searchResults (result) {
    let currentResult = document.querySelectorAll(".scoreEntry")
    currentResult.forEach(function (element) {
        let currentId = element.getAttribute("dataId")
        result.forEach(function (row) {
            if(row.id !== currentId) {
                element.style.display = "none"
            }
        })
    })
}