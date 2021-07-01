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
            getAnswersToResume(uid, canResumeCookie).then(details => {
                console.log(details)
                document.querySelectorAll<HTMLElement>('.question').forEach(question => {
                    document.querySelectorAll<HTMLInputElement>('.questionValue').forEach(value => {
                        if (value.value == details.answers[question.dataset.id].answerID) {
                            value.checked = true
                        }
                    })
                })
            })
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

