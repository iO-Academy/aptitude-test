/**
 * Send the new/updated JSON data to the database API
 *
 * @param {Object} data form data to be sent
 * @param {string} path The path of the API URL to send data to
 *
 * @return object Success or fail API response message
 */

async function sendData(data: FormData, path: string) {
    let baseUrl = getBaseUrl();
    let response =  await fetch(baseUrl + path, {
        method: 'POST',
        body: data
    });
    return await response.json()
}
