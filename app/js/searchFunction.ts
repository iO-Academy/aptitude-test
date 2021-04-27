/**
 * Takes the input from the search box and checks if it has an illegal character
 *
 * @param input value from the search box
 *
 * @returns {boolean} true or false if the input is valid or not
 */
import {BaseUser} from "./interfaces/User";

function validateSearchInput(input: string): boolean {
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
function sanitizeInput(input: string): string {
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
function searchByTextAndEmail(resultArray: Array<BaseUser>): Array<any> {
    let newResultArray = []
    let searchInput = sanitizeInput(document.querySelector<HTMLInputElement>('#searchInput').value)
    let regex = '[\\w@]*' + searchInput + '[\\w@]*'
    let regexSearch = new RegExp(regex, 'i')
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
    let searchContent = document.querySelector<HTMLInputElement>('#searchInput').value
    if (validateSearchInput(searchContent)) {
        updateScoreTable()
    } else {
        alert('Invalid search input, please only use letters, numbers, @\'s or .\'s, underscores and hyphens!')
    }
})

document.getElementById('searchReset').addEventListener('click', () => {
    document.querySelector<HTMLInputElement>('#searchInput').value = ''
    updateScoreTable()
})
