let flaggedQuestions = {}
/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate: string) {
    let template: Function = Handlebars.compile(HBTemplate)
    let counter = 0;
    let cookie = getCookie('userEmail');
    let canResumeCookie = getCookie('canResume')
    let uid = getCookie('uid')
    getData(`user?email=${cookie}`)
        .then((data) => {getData(`question?test_id=${data.data.test_id}`)
            .then((result) => {
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
                if (canResumeCookie == '1') {
                    getAnswersToResume(uid).then(result => {
                        document.querySelectorAll<HTMLElement>('.question').forEach(question => {
                            question.querySelectorAll<HTMLInputElement>('.questionValue').forEach(questionValue => {
                                let data = result.answers[question.dataset.id].answerID
                                if (data !== undefined && questionValue.value == data) {
                                    question.querySelector('#notes').textContent = result.answers[question.dataset.id].notes
                                    questionValue.checked = true
                                }
                            })
                        })
                    })
                }
        })
    })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})

document.querySelector('#flag-checkbox').addEventListener('change', function() {
    let qid  = document.querySelector<HTMLElement>('#questions .question.active').dataset.questionOrderId
    flaggedQuestions[qid] = document.querySelector<HTMLInputElement>('#flag-checkbox').checked
})

