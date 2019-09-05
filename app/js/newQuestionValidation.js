let form = document.querySelector('form')
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    if (formHasQuestion(form) && formHasBetweenOneAndFiveAnswers(form) && answerHasValidValue(form)) {
        document.getElementById('message-target').innerHTML = '<p class="success-message">Question input accepted</p>'
    } else {
        document.getElementById('message-target').innerHTML = '<p class="success-message">Error with question input. Please try again</p>'
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
        if (checkbox.previousElementSibling.value.length > 0 && checkbox.checked === true) {
            result = true
        }
    })
    return result
}
