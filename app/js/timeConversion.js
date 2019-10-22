/**
 * converts seconds into minutes and seconds
 *
 * @param timeInSeconds - time in seconds
 */
function secsToMinsAndSecs(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60)
    var seconds = time - minutes * 60
}




function sendUserResults(number) {
    let baseUrl = getBaseUrl()
    let userResultsForm = jsonToFormData(userResults)

    let resultsResponse = fetch(baseUrl + "answer", {
        method: 'post',
        body: userResultsForm
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            return data
        })
        .catch(function(err) {
        })

    return resultsResponse
}