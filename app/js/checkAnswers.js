const questionAmount = 30// amount of questions

document.querySelector('#finish').addEventListener('click', function() {
    let unanswered = questionAnswered()
    let flaggedNumber = 0
    Object.values(flaggedQuestions).forEach(function(question) {
        if (question) {
            flaggedNumber++
        }
    })
    if (unanswered == false && flaggedNumber == false) {
        showResults()
    } else {
        let flagList = document.getElementById('flag-list')
        let unansweredList = document.getElementById('unanswered-list')
        if (unanswered.length) {
            document.getElementById('modal-title-1').textContent = `You have ${unanswered.length} unanswered questions.`
        }
        if (Object.values(flaggedQuestions).includes(true)) {
            document.getElementById('modal-title-2').textContent = `You have ${flaggedNumber} flagged questions.`
        }
        flagList.innerHTML = ''
        unansweredList.innerHTML = ''
        Object.values(flaggedQuestions).forEach(function(isQuestionFlagged, qId) {
            if (isQuestionFlagged) {
                flagList.innerHTML += "<li>" + (qId + 1) + "</li>"
            }
        })
        removeDialogList(flagList)
        unanswered.forEach(function (qID) {
            unansweredList.innerHTML += "<li>" + qID + "</li>"
        })
        removeDialogList(unansweredList)
        openDialog()
        document.querySelector('#modal-close').addEventListener('click', function() {
            document.querySelector('#modal-finish').removeEventListener('click', finishTest)
            closeDialog()
        })
        document.querySelector('#modal-finish').addEventListener('click', finishTest)
    }
})

/**
 * called when clicking finish button in dialogue box
 */
function finishTest() {
    showResults()
    closeDialog()
}

/**
 * Removes list from dialog box if list is empty
 *
 * @param listName is the list's DOM element
 */
function removeDialogList(listName) {
    if (listName.innerHTML === '') {
        listName.parentElement.style.display = 'none'
    } else {
        listName.parentElement.style.display = 'block'
    }
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
            uid: parseInt(getCookie('uid'), 10),
            answers: userAnswers,
            score: userScore,
            time: parseFloat(getTimeForApi()),
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
    let data = await fetch("http://localhost:8080/answer", {method: 'get'})
    return data.json()
}

/**
 * gets answers the user provided from the DOM
 *
 * @return Object of users answers
 */
function getUserAnswers() {
    let checkedInputs = document.querySelectorAll('#questions .question .answers input:checked')
    let qAmount = document.querySelectorAll('#questions .question').length
    let answers = {}
    for (let i = 1; i <= qAmount; i++) {
        answers[i] = 'unanswered'
    }
    
    checkedInputs.forEach(function(input) {
        let id = input.name.split("_")[1]
        answers[id] = input.value   
    })
    return answers
}


/**
 * gets number of answered questions
 *
 * @param userAnswers answers provided by user
 * @param questionAmount total number of questions
 *
 * @return Integer number of answered questions
 */
function getAnswered(userAnswers, questionAmount) {
    let userAnswersArray = Object.values(userAnswers)
    let unanswered = 0
    userAnswersArray.forEach(function(answerItem) {

            if (answerItem == "unanswered") {
                unanswered++
            }
        })
    return questionAmount - unanswered
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
        input.addEventListener('click', function(e) {
            if (e.target.tagName == 'INPUT') {
                let id = parseInt(this.dataset['id']) - 1
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
 * this gets the unanswered questions and puts their question id into an array
 *
 * @returns the array of question ids that havent been answered
 */
function questionAnswered() {
    let answers = getUserAnswers()
    let answersArr = Object.values(answers)
    let unanswered = []
    //qID refers to the question ID, and is incremented each iteration
    answersArr.forEach(function (value, qID) {
        qID++
        if (value == 'unanswered') {
            unanswered.push(qID)
        }
    })
    return unanswered
}

/**
 * this checks the answers and marks them to show the finishing page
 */
function showResults() {
    const userAnswers = getUserAnswers(questionAmount)
    checkAnswers(userAnswers).then(function (result) {
        let percentResult
        let answered
        if (result.score || result.score === 0) {
            document.querySelector('#question_page').style.display = 'none'
            document.querySelector('#result_page').style.display = 'block'
            percentResult = getPercentResult(result.score, questionAmount)
            answered = getAnswered(userAnswers, questionAmount)
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