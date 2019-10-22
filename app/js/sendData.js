/**
 * Send the new question to the database API
 *
 * @return object - addedQuestionResponse
 */
function sendData(data, path) {
    let baseUrl = getBaseUrl()
    fetch(baseUrl + path, {
        method: 'POST',
        body: data
    }).then( response => {
        return response.json()
    }).then( blob => {
        showConfirmationMessage(blob)
    })
}

/**
 * Display message based on API response
 * @apiResponseJson The JSON returned in the API response
 */
function showConfirmationMessage(apiResponseJson) {
    document.querySelector('#message').innerText = apiResponseJson.message
}