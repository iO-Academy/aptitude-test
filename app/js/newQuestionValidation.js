let form = document.querySelector('form')
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    formHasQuestion(form)
    formHasBetweenOneAndFiveAnswers(form)
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
    answers.forEach(function(answer)
    {
        if(answer.value.length > 0) {
            fieldsThatHaveValues++
        }
    })
    console.log(fieldsThatHaveValues)
}