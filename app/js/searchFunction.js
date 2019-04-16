


/**
 * Takes the input from the search box and checks if it has an illegal character
 *
 * @param input value from the search box
 *
 * @returns {boolean} true or false if the input is valid or not
 */
function validateInput (input) {
    const checkValue = /^[\w-_.@ ]*$/
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

function search (copy) {
    let newCopy = []
    let searchInput = document.getElementById('searchForm').value
    let regexSearch = '[\\w@]*' + searchInput + '[\\w@]*'
    if (searchInput.length !== 0) {
        copy.forEach(data => {
            if (regexSearch.test(data.name) || regexSearch.test(data.email)) {
                newCopy.push(data)
            }
        })
        return newCopy
    }   else {
        return copy
    }
}

document.getElementById('searchForm').addEventListener( 'submit',(e)=>{
    e.preventDefault()
})

document.getElementById('searchSubmit').addEventListener('click', ()=>{
})

