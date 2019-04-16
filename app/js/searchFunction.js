


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

/**
 *
 * returns the results from the search input as an array, allows partial search
 *
 * @param array from AJAX request
 *
 * @returns array of objects
 */

function search (copy) {
    let newCopy = []
    let searchInput = document.getElementById('searchInput').value
    let regex = '[\\w@]*' + searchInput + '[\\w@]*'
    let regexSearch = new RegExp(regex)
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

