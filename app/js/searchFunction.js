/**
 * Takes the input from the search box and checks if it has an illegal character
 *
 * @param input value from the search box
 *
 * @returns {boolean} true or false if the input is valid or not
 */
function validateSearchInput (input) {
    const checkValue = /^[\w-_.@' ]*$/
    if (!input.match(checkValue)) {
        return false
    } else {
        return true
    }
}

/**
 *
 * removes all the whitespaces from the start and the end of the input
 *
 * @param input value from the search box
 *
 * @returns {string} string without whitespaces
 */
function sanitizeInput (input) {
    return input.trim()
}

/**
 *
 * returns the results from the search input as an array, allows partial search
 *
 * @param resultArray from AJAX request
 *
 * @returns array of objects
 */
function searchByTextAndEmail (resultArray) {
    let newResultArray = []
    let searchInput = sanitizeInput(document.getElementById('searchInput').value)
    let regex = '[\\w@]*' + searchInput + '[\\w@]*'
    let regexSearch = new RegExp(regex)
    if (searchInput.length !== 0) {
        resultArray.forEach(data => {
            if (regexSearch.test(data.name) || regexSearch.test(data.email)) {
               newResultArray.push(data)
            }
        })
        return newResultArray
    }   else {
        return resultArray
    }
}

document.getElementById('searchSubmit').addEventListener('click', ()=>{
    let searchContent = document.getElementById('searchInput').value
    if (validateSearchInput(searchContent)) {
        // updateScoreTable()

        document.querySelectorAll('table tr td:first-child').forEach(row => {

            let regex = '[\\w@]*' + searchContent + '[\\w@]*'
            let regexSearch = new RegExp(regex)
            if (!regexSearch.test(row.getAttribute("dataname")) && !regexSearch.test(row.getAttribute("dataemail"))) {
                row.parentElement.classList.add('hidden')
            } else {
                row.parentElement.classList.remove('hidden')
            }

        })

    } else {
        alert('Invalid search input, please only use letters, numbers, @\'s or .\'s, underscores and hyphens!')
    }
})

document.getElementById('searchReset').addEventListener('click', ()=>{
    const input = document.getElementById('searchInput')
    input.value = ''
    document.querySelectorAll('table tr').forEach(row => {
        row.classList.remove('hidden')
    })
})
