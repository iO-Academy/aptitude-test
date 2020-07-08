document.querySelector(".overview").addEventListener("click", function() {
    const tableBody = document.querySelector('.overview_table_body')
    // Sets the table body content as empty in case any table body has been created before
    tableBody.innerHTML = ''
    let overviewData = []
    let numOfQuestions = document.querySelectorAll('#questions .question').length
    let objAnswers = getUserAnswers()
    let questionDbId
    let questionObject
    for (let i = 1; i <= numOfQuestions; i++) {
        questionDbId = document.querySelector<HTMLElement>(`.q_${i}`).dataset.id
        questionObject = {}
        questionObject['id'] = i
        questionObject['isFlagged'] = flaggedQuestions[i]
        if (objAnswers.hasOwnProperty(questionDbId)) {
            questionObject['isAnswered'] = true
        }
        questionObject['question'] = document.querySelector<HTMLElement>(`.q_${i} .question_text`).innerText.substring(0, 110) + '...'
        overviewData.push(questionObject)
    }

    getTemplateAjax('js/templates/overview.hbs').then(function(HBTemplate) {
        let template = Handlebars.compile(HBTemplate)
        let html = ''
        overviewData.forEach(function(answer) {
            html += template(answer)
        })
        tableBody.insertAdjacentHTML('afterbegin', html)
    })
    document.querySelector<HTMLElement>('#overview_page').style.display = 'block'
    document.querySelector<HTMLElement>('#question_page').style.display = 'none'
})

document.querySelector('table').addEventListener('click', function(e: any) {
    current = e.target.parentNode.dataset.id
    changeQuestion(current)
    document.querySelector<HTMLElement>('#overview_page').style.display = 'none'
    document.querySelector<HTMLElement>('#question_page').style.display = 'block'
})