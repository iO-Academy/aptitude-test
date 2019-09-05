function getQuestionCount() {
    fetch("http://localhost:8080/question")
        .then(result => result.json())
        .then(questions => {
            document.querySelector('#question-count').innerText = questions.data.length
        })
}

getQuestionCount()
