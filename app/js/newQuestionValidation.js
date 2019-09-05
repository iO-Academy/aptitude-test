let form = document.querySelector('form')
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    formHasQuestion(form)
    formHasBetweenOneAndFiveAnswers(form)
    console.log(form)
})

function formHasQuestion(form) {
    if (form.questionField.value.length === 0) {
        return false
    } else {
        return true
    }
}

function formHasBetweenOneAndFiveAnswers(form) {
    let answers = form.querySelectorAll('.answer')
    let fieldsThatHaveValues = 0
    answers.forEach( (answer) => {
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
    if(form.input.previousElementSibling.length === 0) {
        console.log('empty field')
    }
    else{
        console.log('good to go')
    }
}