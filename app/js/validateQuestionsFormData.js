//validate the right keys & no null values exist
//then jsonify
//then send it
let newQuestion = {}
let allAnswers = document.querySelectorAll('.answer')

allAnswers.forEach(function(answer, index) {
    answer.addEventListener('input', () => {
        event.target.nextElementSibling.innerHTML = "<input type=\"radio\" name=\"answer_radio_button\" value=" + (index + 1) +  "><p>Correct Answer</p>"
    })
})

allAnswers.forEach(function (answer) {
    answer.addEventListener('blur', () => {
        if (!event.target.value.trim()) {
            event.target.nextElementSibling.innerHTML = ''
        }
    })
})

document.querySelector('.add_question').addEventListener('submit', function(event) {
    event.preventDefault()

    let question = document.getElementById('question').value
    let answer1 = allAnswers[0].value
    let answer2 = allAnswers[1].value
    let answer3 = allAnswers[2].value
    let answer4 = allAnswers[3].value
    let answer5 = allAnswers[4].value
    let correctAnswer = document.getElementsByName('answer_radio_button')
    let questionError = document.querySelector('#question-error')
    let answer1Error = document.querySelector('#answer1-error')
    let answer2Error = document.querySelector('#answer2-error')
    let correctAnswerError = document.querySelector('#correct-answer-error')
    let questionJson

    function validateQuestionText() {
        if (question.trim().length !==0) {
            newQuestion.text = question
            questionError.classList.add('hidden')
        } else {
            questionError.classList.remove('hidden')
        }
    }

    function validateRequiredAnswers() {
        if (answer1.trim().length !==0 && answer2.trim().length !==0) {
            newQuestion.option1 = answer1
            newQuestion.option2 = answer2
            correctAnswerError.classList.add('hidden')
            setCorrectAnswer()
            answer1Error.classList.add('hidden')
            answer2Error.classList.add('hidden')
        } else if ((answer1.trim().length === 0) && (answer2.trim().length !==0)) {
            answer1Error.classList.remove('hidden')
            newQuestion.option2 = answer2
            if (!answer2Error.classList.contains('hidden')) {
                answer2Error.classList.add('hidden')
            }
        } else if ((answer1.trim().length !==0) && (answer2.trim().length ===0)) {
            newQuestion.option1 = answer1
            if (!answer1Error.classList.contains('hidden')) {
                answer1Error.classList.add('hidden')
            }
            answer2Error.classList.remove('hidden')
        } else {
            answer1Error.classList.remove('hidden')
            answer2Error.classList.remove('hidden')
        }
    }

    function validateOptionalAnswers() {
        if (answer3.trim().length !==0) {
            newQuestion.option3 = answer3
        }

        if (answer4.trim().length !==0) {
            newQuestion.option4 = answer4
        }

        if (answer5.trim().length !==0) {
            newQuestion.option5 = answer5
        }
    }

    function setCorrectAnswer() {
        correctAnswer.forEach( function(answer) {
            if (answer.checked) {
                correctAnswerError.classList.add('hidden')
                newQuestion.answer = answer.value
            } else if (newQuestion.answer === null) {
                correctAnswerError.classList.remove('hidden')
            }
        })
    }

    if (!correctAnswerError.classList.contains('hidden')) {
        correctAnswerError.classList.remove('hidden')
    }

    validateQuestionText()
    validateRequiredAnswers()
    validateOptionalAnswers()

    questionJson = JSON.stringify(newQuestion)

    console.log(newQuestion)

    console.log(questionJson)

})