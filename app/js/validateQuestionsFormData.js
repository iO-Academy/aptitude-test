let newQuestion = {
    "text": null,
    "option1": null,
    "option2": null,
    "option3": null,
    "option4": null,
    "option5": null,
    "answer": null
}

document.querySelectorAll('.answer').forEach(function(answer, index) {
    answer.addEventListener('input', () => {
        event.target.nextElementSibling.innerHTML = "<input type=\"radio\" name=\"answer_radio_button\" value=" + (index + 1) +  "><p>Correct Answer</p>"
    })
})

document.querySelectorAll('.answer').forEach(function (answer) {
    answer.addEventListener('blur', () => {
        if (!event.target.value.trim()) {
            event.target.nextElementSibling.innerHTML = ''
        }
    })
})

document.querySelector('.add_question').addEventListener('submit', function(event) {
    event.preventDefault()

    question = document.getElementById('question').value
    answer1 = document.getElementById('answer1').value
    answer2 = document.getElementById('answer2').value
    answer3 = document.getElementById('answer3').value
    answer4 = document.getElementById('answer4').value
    answer5 = document.getElementById('answer5').value
    let correctAnswer = document.getElementsByName('answer_radio_button')

    // console.log(correctAnswer)

    if (question.trim().length !==0) {
        newQuestion.text = question
        document.querySelector('#question-error').classList.add('hidden')
    } else {
        document.querySelector('#question-error').classList.remove('hidden')
    }

    if (answer1.trim().length !==0 && answer2.trim().length !==0) {
        newQuestion.option1 = answer1
        newQuestion.option2 = answer2
        // if (!document.querySelector('#correct-answer-error').classList.contains('hidden')) {
            document.querySelector('#correct-answer-error').classList.add('hidden')
            setCorrectAnswer()
        // }
        document.querySelector('#answer1-error').classList.add('hidden')
        document.querySelector('#answer2-error').classList.add('hidden')
    } else if ((answer1.trim().length === 0) && (answer2.trim().length !==0)) {
        document.querySelector('#answer1-error').classList.remove('hidden')
        newQuestion.option2 = answer2
        if (!document.querySelector('#answer2-error').classList.contains('hidden')) {
            document.querySelector('#answer2-error').classList.add('hidden')
        }
    } else if ((answer1.trim().length !==0) && (answer2.trim().length ===0)) {
        newQuestion.option1 = answer1
        if (!document.querySelector('#answer1-error').classList.contains('hidden')) {
            document.querySelector('#answer1-error').classList.add('hidden')
        }
        document.querySelector('#answer2-error').classList.remove('hidden')
    } else {
        document.querySelector('#answer1-error').classList.remove('hidden')
        document.querySelector('#answer2-error').classList.remove('hidden')
    }

    if (answer3.trim().length !==0) {
        newQuestion.option3 = answer3
    } else {
        newQuestion.option3 = null
    }

    if (answer4.trim().length !==0) {
        newQuestion.option4 = answer4
    } else {
        newQuestion.option4 = null
    }

    if (answer5.trim().length !==0) {
        newQuestion.option5 = answer5
    } else {
        newQuestion.option5 = null
    }


    function setCorrectAnswer() {
        correctAnswer.forEach( function(answer) {
            if (answer.checked) {
                document.querySelector('#correct-answer-error').classList.add('hidden')
                newQuestion.answer = answer.value
            } else if (newQuestion.answer === null) {
                document.querySelector('#correct-answer-error').classList.remove('hidden')
            }
        })
    }

    document.querySelector('#correct-answer-error').classList.remove('hidden')

     console.log(newQuestion)
})