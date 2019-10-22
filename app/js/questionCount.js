function getQuestionCount() {
    let baseUrl = getBaseUrl()
    fetch(baseUrl + "question")
        .then(result => result.json())
        .then(questions => {
            document.querySelector('#question-count').innerText = questions.data.length
        })
}

getQuestionCount()

document.getElementById('question').addEventListener('submit', function(e) {
    e.preventDefault()
    getQuestionCount()
})