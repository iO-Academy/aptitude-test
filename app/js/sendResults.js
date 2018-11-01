/**
 * send user results to be submitted to the db
 *
 * @return object - user results
 */
function sendUserResults(userResults) {
   let userResultsForm = jsonToFormData(userResults)

    let resultsResponse = fetch("http://localhost:8080/answer", {
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

/**
 * assigning user message depending on API response Object
 *
 * @param promise -  response from resultsPost
 */
async function handleResponseFromAPI (response) {
    let messageToTestTaker = ""

    await response.then(function(data)  {
        if (data.success) {
            messageToTestTaker = 'Your results have been successfully logged'
        } else {
            messageToTestTaker = 'Error sending your results: Do not close browser! Please find the nearest member of staff and show them this screen'
        }
    })
    document.querySelector('body').innerHTML += '<p class="error_message text-danger">' + messageToTestTaker +'</p>'
}