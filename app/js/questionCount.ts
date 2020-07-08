function getQuestionCount() {
    let baseUrl = getBaseUrl()
    fetch(baseUrl + "question")
        .then(result => result.json())
        .then(questions => {
            document.querySelector<HTMLElement>('#question-count').innerText = questions.data.length
        })
}

getQuestionCount()
