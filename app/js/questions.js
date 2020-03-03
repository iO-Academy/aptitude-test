const flaggedQuestions = {}

/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    let baseUrl = getBaseUrl()
    let template = Handlebars.compile(HBTemplate)
    let counter = 0;
    fetch(baseUrl + "question")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            let questionNoAssign = 1
            result.data.forEach(function(question) {
                flaggedQuestions[question.id] = false
                question['questionOrderId'] = questionNoAssign
                document.querySelector("#questions").innerHTML += template(question)
                questionNoAssign++
            })
            counter = result.data.length

            putDescription(counter)
            addAnswerEventListeners()
            fillNav()
            active()
        })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})

document.querySelector('#flag-checkbox').addEventListener('change', function() {
    let qid  = document.querySelector('#questions .question.active').dataset.questionOrderId
    flaggedQuestions[qid] = document.querySelector('#flag-checkbox').checked
})