document.querySelector(".overview").addEventListener("click", function() {
    let overviewData = []
    let numOfQuestions = document.querySelectorAll('#questions .question').length
    for (let i = 1; i <= numOfQuestions; i++) {
        let questionObject = {}
        questionObject['id'] = i
        questionObject['isFlagged'] = flaggedQuestions[i]
        questionObject['isAnswered'] = getUserAnswers()[i] == 'unanswered' ? false : true
        questionObject['question'] = document.querySelectorAll(`.q_${i} p`)[1].innerText.substring(0, 20) + '...'
        overviewData.push(questionObject)
    }
    getTemplateAjax('js/templates/overview.hbs').then(function(HBTemplate) {
        let template = Handlebars.compile(HBTemplate)
        let html = ''
        overviewData.forEach(function(answer) {
            html += template(answer)
        })
        document.querySelector('.overview_table_body').insertAdjacentHTML('afterBegin', html)
    })
    document.querySelector('#overview_page').style.display = 'block';
    document.querySelector('#question_page').style.display = 'none';
})

