/**
 * send new question to be submitted to the db
 *
 * @return object - question
 */
function sendNewQuestion(newQuestion) {
    let addQuestionForm = jsonToFormData(newQuestion)

    let addedQuestionResponse = fetch("http://localhost:8080/question", {
        method: 'post',
        body: addQuestionForm
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            return data
        })
        .catch(function(err) {
        })

    return addedQuestionResponse
}