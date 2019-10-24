const flaggedQuestions = {}
let nonDeletedQuestions = []

/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    nonDeletedQuestions = []
    let baseUrl = getBaseUrl()
    let template = Handlebars.compile(HBTemplate)
    let counter = 0
    let questionCounter = 0
    fetch(baseUrl + "question")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            result.data.forEach(function (question) {
                if (question.deleted != 1){
                    questionCounter++
                    question.id = questionCounter
                    nonDeletedQuestions[questionCounter] = question
                }
            })

            if(nonDeletedQuestions.length == 1) {
                checkIfOneQuestion();
            }

            if (nonDeletedQuestions.length != 0) {
                nonDeletedQuestions.forEach(function(question) {
                    console.log(question.id)
                    flaggedQuestions[question.id] = false
                    document.querySelector("#questions").innerHTML += template(question)
                })
            } else {
                window.location.replace('index.html')
            }
        })
        .then(function() {
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
    let qid  = document.querySelector('#questions .question.active').dataset.id
    flaggedQuestions[qid] = document.querySelector('#flag-checkbox').checked
})