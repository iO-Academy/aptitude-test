let submit = document.getElementsByClassName("submit");
let form = document.querySelector("form");
let formData = new FormData(form);

/**
 * get form value and convert it into json
 *
 * */
form.addEventListener('submit', function(event) {
    event.preventDefault()
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
 * send new question to be submitted to the db
 *
 * @return object - addedQuestionResponse
 */
function sendNewQuestion(questionData) {
    let addedQuestionResponse = fetch("http://localhost:8080/question", {
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