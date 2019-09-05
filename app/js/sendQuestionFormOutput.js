let submit = document.getElementsByClassName("submit");
let form = document.querySelector("form");
let formData = new FormData(form);


form.addEventListener('submit', function(event) {
    event.preventDefault()
    var questionData = {}
    questionData.question = form.option1.value
})

/**
 * Convert addQuestion form data into JSON
 *
 * @return newQuestionJson
 */
let newQuestion = {}
formData.forEach((value, key) => {newQuestion[key] = value})
const newQuestionJson = JSON.stringify(newQuestion)

console.log(newQuestionJson)
/**
 * send new question to be submitted to the db
 *
 * @return object - addedQuestionResponse
 */
// (async () => {
//     const rawResponse = await fetch('http://localhost:8080/question', {
//         method: 'POST',
//         body: newQuestionJson
//     })
//     const content = await rawResponse.json()
//
//     console.log(content)
// })();


function sendNewQuestion(event, newQuestionJson) {
    event.preventDefault();

    let addQuestionForm = jsonToFormData(newQuestionJson)

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

    console.log(addedQuestionResponse)
}

submit.addEventListener('click', sendNewQuestion(newQuestionJson))