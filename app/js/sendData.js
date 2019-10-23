/**
 * Send the new/updated JSON data to the database API
 *
 * @param {FormData} data form data to be sent
 * @param {string} path The path of the API URL to send data to
 *
 * @return object Success or fail API response message
 */

async function sendData(data, path) {
    let baseUrl = getBaseUrl()
    let response =  await fetch(baseUrl + path, {
        method: 'POST',
        body: data
    })
    return await response.json()
}
