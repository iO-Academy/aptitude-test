
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
 * gets all users name and email from API
 *
 * @param
 *
 * @return Array - containing the user info (Name and Email)
 */
function searchResults (result) {
    let currentResult = document.querySelectorAll(".scoreEntry")
    currentResult.forEach(function (element) {
        let currentId = element.getAttribute("dataId")
        result.forEach(function (row) {
            if(row.id !== currentId) {
                element.style.display = "none"
            } else {
                element.style.display = "block"
            }
        })
    })
}