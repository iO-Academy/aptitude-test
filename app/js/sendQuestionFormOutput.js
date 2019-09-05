let submit = document.getElementsByClassName("submit");
let form = document.querySelector("form");
let formData = new FormData(form);

/**
 * When the user clicks the submit button, will get form value and prepare 
 * it for the database.
 */
form.addEventListener('submit', function(event) {
    event.preventDefault()
    if(!(user.isAdmin == "1")) {
        return
    }
    var questionData = {}
    questionData.text = form.question.value
    questionData.option1 = form.option1.value
    questionData.option2 = form.option2.value
    questionData.option3 = form.option3.value
    questionData.option4 = form.option4.value
    questionData.option5 = form.option5.value
    questionData.answer = 1
    let questionDataToSend = jsonToFormData(questionData);
    sendNewQuestion(questionDataToSend)
})

/**
 * Send the new question to the database API
 *
 * @return object - addedQuestionResponse
 */
function sendNewQuestion(questionData) {
    fetch("http://localhost:8080/question", {
        method: 'POST',
        body: questionData
    })
}

/**
 * Display message based on API response
 * @apiResponseJson The JSON returned in the API response
 */
function showConfirmationMessage(apiResponseJson) {
    let parsedResponse = JSON.parse(apiResponseJson)
    document.querySelector('#message').innerText = parsedResponse.message
}