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

document.getElementById('searchForm').addEventListener( 'submit',(e)=>{
    e.preventDefault()
})

document.getElementById('searchSubmit').addEventListener('click', ()=>{
})

document.getElementById('searchReset').addEventListener('click', ()=>{
    const input = document.getElementById('searchInput')
    input.value=''
    updateScoreTable()
})