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
    var json = JSON.stringify(questionData)
    sendNewQuestion(json)
})

/**
 * send new question to be submitted to the db
 *
 * @return object - addedQuestionResponse
 */
function sendNewQuestion(newQuestionJson) {
    let addedQuestionResponse = fetch("http://localhost:8080/question", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: newQuestionJson
    })
}