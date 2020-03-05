function getQuestionCount(testId, testName) {
    let baseUrl = getBaseUrl()
    fetch(baseUrl + `question?test_id=${testId}`)
        .then(result => result.json())
        .then(questions => {
            document.querySelector('#question-count').innerText = questions.data.length
            document.getElementById('test-title').innerText = testName
        })
}

//getting the id of the first test in db and displaying correct question count in manage question section
function getFirstTestId() {
    let baseUrl = getBaseUrl()
    let firstTestId;
    fetch(baseUrl + 'test')
        .then(result => result.json())
        .then((tests) => {
            firstTestId = tests.data[0].id
            console.log(firstTestId)
            getQuestionCount(firstTestId)
        })
}

getFirstTestId()
