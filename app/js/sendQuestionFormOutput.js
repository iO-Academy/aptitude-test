let authorised = false
let user = getCookie('userEmail')

getUser(user).then(function(user) {
    if (user.data.isAdmin == '1') {
        authorised = true
    }
})

function formHasQuestion(form) {
    form.question.value = form.question.value.trim()
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
        answer.value = answer.value.trim()
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
let responseMsg = document.querySelector('#inputSubmissionConfirmation')

document.querySelector('input[type=submit]').addEventListener('click', (e)=>{
    e.preventDefault()
    let submitMode
    if (e.target.id === 'btnSubmitNewQuestion') {
        submitMode = 'new'
        questionFormSubmit(submitMode)
    } else if (e.target.id === 'btnSubmitEdit') {
        submitMode = 'edit'
        questionFormSubmit(submitMode)
    }
})


async function questionFormSubmit(submitMode) {
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

        let questionData = {}
        questionData.text = replaceSpecialChars(newQuestionForm.question.value)
        questionData.option1 = replaceSpecialChars(newQuestionForm.option1.value)
        questionData.option2 = replaceSpecialChars(newQuestionForm.option2.value)
        questionData.option3 = replaceSpecialChars(newQuestionForm.option3.value)
        questionData.option4 = replaceSpecialChars(newQuestionForm.option4.value)
        questionData.option5 = replaceSpecialChars(newQuestionForm.option5.value)
        questionData.answer = answer
        questionData.test_id = newQuestionForm.test_id.value
        let questionDataToSend = await jsonToFormData(questionData);
        let questionPath

        if (submitMode === 'new') {
            questionPath = 'question'
        } else if (submitMode === 'edit') {
            questionPath = `question/${newQuestionForm.dataset.questionDbId}/edit`
        }

        let response = await sendData(questionDataToSend, questionPath)
        responseMsg.innerText = response.message
        if (response.success){
            responseMsg.classList.add('alert-success')
            responseMsg.classList.remove('alert-danger')
        } else {
            responseMsg.classList.remove('alert-success')
            responseMsg.classList.add('alert-danger')
        }
    } else {
        responseMsg.classList.remove('alert-success')
        responseMsg.classList.add('alert-danger')
        responseMsg.innerHTML = 'Error: Please ensure you have filled out the question form correctly.'
    }
}

// populate dropdown menu with available tests
populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test')

