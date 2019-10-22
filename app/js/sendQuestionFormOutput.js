let authorised = false
let user = getCookie('userEmail')
getUser(user).then(function(user) {
    if ( user.data.isAdmin == '1' ) {
        authorised = true
    }
})

function formHasQuestion(form) {
    if (form.question.value.length === 0) {
        return false
    } else {
        return true
    }
}

function formHasBetweenOneAndFiveAnswers(form) {
    let answers = form.querySelectorAll('.answer')
    let fieldsThatHaveValues = 0
    answers.forEach((answer) => {
        if (answer.value.length > 0) {
            fieldsThatHaveValues++
        }
    })
    if (fieldsThatHaveValues >= 2) {
        return true
    } else {
        return false
    }
}

function answerHasValidValue(form) {
    let result = false
    form.querySelectorAll('.answer-check').forEach((checkbox) => {
        if (
            typeof checkbox.previousElementSibling.value != 'undefined' &&
            checkbox.previousElementSibling.value.length > 0 &&
            checkbox.checked === true
        ) {
            result = true
        }
    })
    return result
}

let newQuestionForm = document.getElementById("new-question")

/**
 * When the user clicks the submit button, will get form value and prepare 
 * it for the database.
 */
newQuestionForm.addEventListener('submit', function(event) {
    event.preventDefault()
    if (formHasQuestion(newQuestionForm) && formHasBetweenOneAndFiveAnswers(newQuestionForm) && answerHasValidValue(newQuestionForm)) {
        if(!authorised) {
            return
        }
        let answer
        document.querySelectorAll('.answer-check').forEach((answerCheck, index) => {
            if(answerCheck.checked) {
                answer = index + 1
            }
        })

        var questionData = {}
        questionData.text = newQuestionForm.question.value
        questionData.option1 = newQuestionForm.option1.value
        questionData.option2 = newQuestionForm.option2.value
        questionData.option3 = newQuestionForm.option3.value
        questionData.option4 = newQuestionForm.option4.value
        questionData.option5 = newQuestionForm.option5.value
        questionData.answer = answer
        questionData.test_id = newQuestionForm.test_id.value
        let questionDataToSend = jsonToFormData(questionData);
        sendNewQuestion(questionDataToSend)
    } else {
        document.getElementById('message-target').innerHTML = '<p class="failure-message">Error with question input. Please try again</p>'
    }
})

/**
 * Send the new question to the database API
 *
 * @return object - addedQuestionResponse
 */
function sendNewQuestion(questionData) {
    let baseUrl = getBaseUrl()
    fetch(baseUrl + "question", {
        method: 'POST',
        body: questionData
    }).then( response => {
        return response.json()
    }) .then ( blob => {
        showConfirmationMessage(blob)
    })
}

/**
 * Display message based on API response
 * @apiResponseJson The JSON returned in the API response
 */
function showConfirmationMessage(apiResponseJson) {
    document.querySelector('#message').innerText = apiResponseJson.message
}