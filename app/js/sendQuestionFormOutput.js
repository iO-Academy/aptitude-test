let submit = document.getElementsByClassName("submit");
let form = document.querySelector("form");
let formData = new FormData(form);

/**
 * Convert addQuestion form data into JSON
 *
 * @return newQuestionJson
 */
let newQuestion = {}
formData.forEach((value, key) => {newQuestion[key] = value})
const newQuestionJson = JSON.stringify(newQuestion)



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