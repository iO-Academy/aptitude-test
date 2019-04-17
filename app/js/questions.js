const flaggedQuestions = {}

/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function populateQuestions(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)
    let counter = 0;
    fetch("http://localhost:8080/question")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            let counter = 1;
            result.data.forEach(function(question) {
                question.id = counter;
                flaggedQuestions[question.id] = false
                document.querySelector("#questions").innerHTML += template(question)
                counter++
            })
            counter = result.data.length
        })
        .then(function() {
            putDescription(counter)
            addAnswerEventListeners()
            fillNav()
            active()
        })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    populateQuestions(HBTemplate)
})

document.querySelector('#flag-checkbox').addEventListener('change', function() {
    let qid  = document.querySelector('#questions .question.active').dataset.id
    flaggedQuestions[qid] = document.querySelector('#flag-checkbox').checked
})