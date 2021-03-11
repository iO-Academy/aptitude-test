/**
 * send user results to be submitted to the db
 *
 * @return object - user results
 */
function sendUserResults(userResults: Object) {
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

/**
 * assigning user message depending on API response Object
 *
 * @param promise -  response from resultsPost
 */
async function handleResponseFromAPI(response: Promise<any>, pageLeft) {
    let messageToTestTaker = ""

    await response.then(function(data)  {
        if (data.success && pageLeft) {
            messageToTestTaker = 'Result of zero has been logged'
        } else if (data.success) {
            messageToTestTaker = 'Your results have been successfully logged'
        } else {
            messageToTestTaker = 'Error sending your results: Do not close browser! Please find the' +
                ' nearest member of staff and show them this screen'
        }
    })
    document.querySelector('body').innerHTML += '<p class="error_message text-danger">' + messageToTestTaker +'</p>'
}


/**
 * Function resetReapplyCounter() loads the test takers information in an object, it sets the
 * canRetake property to "0" and then sends the object back through the API which edits the
 * user input.
 */
async function resetReapplyCounter() {
    let baseUrl = getBaseUrl()
    let email = getCookie('userEmail')
    let response = await fetch(baseUrl + 'user?email=' + email)

    let userObject = await response.json()
    userObject.data.canRetake = 0
    await fetch(baseUrl + 'user/edit', {
        method: "post",
        body: jsonToFormData(userObject.data)
    })
}
