 var questionAmount

document.querySelector('#finish').addEventListener('click', finishTest)
/**
 * called when clicking finish button in dialogue box
 */
function finishTest() {
    showResults()
    document.querySelector<HTMLElement>('#overview_page').style.display = 'none'
    document.querySelector<HTMLElement>('#result_page').style.display = 'none'
}

/**
 * checks the users answers against api answers
 *
 * @param userAnswers answers provided by user
 *
 * @return Promise - containing the result object ready for the api
 */
async function checkAnswers(userAnswers) {
    let userScore = 0
    let answers = await getAnswers()

    if (answers.success) {
        answers = answers.data
        answers.forEach(function (answerItem) {
            if (answerItem.answer == userAnswers[answerItem.id]) {
                userScore++
            }
        })
        let result = {
            uid: parseInt(getCookie('uid') as string, 10), // typecast to string as getCookie shouldnt ever return false
            answers: userAnswers,
            score: userScore,
            time: parseFloat(getTimeForApi()),
            testLength: questionAmount
        }
        return result
    }
    return answers
}

/**
 * gets correct answers from api
 *
 * @return Promise - containing the correct answers
 */
async function getAnswers() {
    let baseUrl = getBaseUrl()
    let data = await fetch(baseUrl + "answer", {method: 'get'})
    return data.json()
}

/**
 * gets answers the user provided from the DOM
 *
 * @return Object of users answers
 */
function getUserAnswers() {
    questionAmount = document.querySelectorAll('#questions .question').length
    let checkedInputs = document.querySelectorAll('#questions .question .answers input:checked')
    let answers = {}

    checkedInputs.forEach(function(input: HTMLInputElement) {
        let id = input.name.split("_")[1]
        answers[id] = input.value
    })

    return answers
}

/**
 * gets percentage of user score
 *
 * @param userScore user score
 * @param questionAmount total number of questions
 *
 * @return Integer percentage of user score
 */
function getPercentResult(userScore, questionAmount) {
    return Math.round(userScore / questionAmount * 100)
}

/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 * @param earnedPercentage percentage of total number of right questions
 * @param answeredQuestions total number of questions that have an answer
 */
function displayResult(earnedPoints, earnedPercentage, answeredQuestions) {
    document.querySelector(".score").innerHTML = earnedPoints
    document.querySelector(".answered_questions").innerHTML = answeredQuestions
    document.querySelector(".score_percentage").innerHTML = earnedPercentage
}

/**
 * function adds event listeners to .question and listens for click event within here
 * it then updates the class of the span containing the question number allowing styling to be applied
 *
 */
function addAnswerEventListeners() {
    document.querySelectorAll('.question').forEach(function (input) {
        input.addEventListener('click', function(e: any) {
            if (e.target.tagName == 'INPUT') {
                let id = parseInt(this.dataset['questionOrderId']) - 1
                document.querySelector('#question-nav').children[id].classList.add('answered-nav-box')
            }
        })
    })
}

/**
 * function removes current status from all questions and then adds current status
 * to the current question allowing styling to be applied
 *
 * @param id is the id of the active question
 */
function trackActiveQuestion(id) {
    let activeQuestion = document.querySelector('.nav-item.current-nav-box')
    if (activeQuestion) {
        activeQuestion.classList.remove('current-nav-box')
    }
    document.querySelector('#question-nav').children[id - 1].classList.add('current-nav-box')
}

/**
 * this checks the answers and marks them to show the finishing page
 */
function showResults() {
    resetReapplyCounter()
    clearInterval(interval)
    const userAnswers = getUserAnswers()
    checkAnswers(userAnswers).then(function (result) {
        let percentResult
        let answered
        if (result.score || result.score === 0) {
            document.querySelector<HTMLElement>('#question_page').style.display = 'none'
            document.querySelector<HTMLElement>('#overview_page').style.display = 'none'
            document.querySelector<HTMLElement>('#result_page').style.display = 'block'
            percentResult = getPercentResult(result.score, questionAmount)
            answered = document.querySelectorAll('#questions .question .answers input:checked').length
            displayResult(result.score, percentResult, answered)
            handleResponseFromAPI(sendUserResults(result))
        } else {
            let body = document.querySelector('body')
            let html = body.innerHTML
            html += '<p class="error_message text-danger">Please contact admin. Answers cannot be checked at present.</p>'
            body.innerHTML = html
        }
    })
}