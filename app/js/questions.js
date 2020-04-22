let flaggedQuestions = {}
/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)
    let counter = 0;
    let cookie = getCookie ('userEmail');
    getData(`user?email=${cookie}`)
        .then((data) => {getData(`question?test_id=${data.data.test_id}`)
            .then(function(result) {
                let questionNoAssign = 1
                result.data.forEach((question) => {
                    question['questionOrderId'] = questionNoAssign
                    flaggedQuestions[question.questionOrderId] = false
                    document.querySelector("#questions").innerHTML += template(question)
                    questionNoAssign++
                })
            counter = result.data.length

            putDescription(counter)
            addAnswerEventListeners()
            fillNav()
            active()
            changeQuestion(current)
        })
    })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})

document.querySelector('#flag-checkbox').addEventListener('change', function() {
    let qid  = document.querySelector('#questions .question.active').dataset.questionOrderId
    flaggedQuestions[qid] = document.querySelector('#flag-checkbox').checked
})