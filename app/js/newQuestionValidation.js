let form = document.querySelector('form')
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    formHasQuestion(form)
    formHasBetweenOneAndFiveAnswers(form)
    answerHasValidValue(form)
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
    form.querySelectorAll('.answer-check').forEach((checkbox) => {
        if (checkbox.previousElementSibling.value.length > 0 && checkbox.checked === true) {
            return true
        } else {
            return false
        }
    })
}

function onlyOneCheckBoxIsChecked(form) {
    let i = 0
    form.querySelectorAll('.answer-check').forEach((checkbox) => {
        if (checkbox.checked) {
            i++
        }
    })
    if (i === 0) {
        return 'No answer selected'
    } else if (i > 1) {
        return 'Please just select one answer'
    }
}