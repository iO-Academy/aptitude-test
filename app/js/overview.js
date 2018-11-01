document.querySelector(".overview").addEventListener("click", function() {
    const tableBody = document.querySelector('.overview_table_body')
    // Sets the table body content as empty in case any table body has been created before
    tableBody.innerHTML = ''
    let overviewData = []
    let numOfQuestions = document.querySelectorAll('#questions .question').length
    let isAnswered = getUserAnswers()
    for (let i = 1; i <= numOfQuestions; i++) {
        let questionObject = {}
        questionObject['id'] = i
        questionObject['isFlagged'] = flaggedQuestions[i]
        questionObject['isAnswered'] = isAnswered[i] !== 'unanswered'
        questionObject['question'] = document.querySelectorAll(`.q_${i} p`)[1].innerText.substring(0, 20) + '...'
        overviewData.push(questionObject)
    }

    getTemplateAjax('js/templates/overview.hbs').then(function(HBTemplate) {
        let template = Handlebars.compile(HBTemplate)
        let html = ''
        overviewData.forEach(function(answer) {
            html += template(answer)
        })
        tableBody.insertAdjacentHTML('afterBegin', html)
    })
    document.querySelector('#overview_page').style.display = 'block';
    document.querySelector('#question_page').style.display = 'none';
})

document.querySelector('table').addEventListener('click', function(e) {
    current = e.target.parentNode.firstElementChild.innerText
    changeQuestion(current)
    document.querySelector('#overview_page').style.display = 'none';
    document.querySelector('#question_page').style.display = 'block';
})