/**
 * Send the new/updated JSON data to the database API
 *
 * @param {JSON} data JSON data to be sent
 * @param {string} path The path of the API URL to send data to
 *
 * @return object Success or fail API response message
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