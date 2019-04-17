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

    let newQuestion = {}
    let question = document.getElementById('question').value
    let answer1 = allAnswers[0].value
    let answer2 = allAnswers[1].value
    let answer3 = allAnswers[2].value
    let answer4 = allAnswers[3].value
    let answer5 = allAnswers[4].value
    let correctAnswers = document.getElementsByName('answer_radio_button')
    let questionError = document.querySelector('#question-error')
    let answer1Error = document.querySelector('#answer1-error')
    let answer2Error = document.querySelector('#answer2-error')
    let correctAnswerError = document.querySelector('#correct-answer-error')

    /**
     * Validates question field and populates newQuestion object with correct question data, otherwise shows error
     */
    function validateQuestionText() {
        if (question.trim().length !==0) {
            newQuestion.text = question
            questionError.classList.add('hidden')
        } else {
            questionError.classList.remove('hidden')
        }
    }

    let oneIsWrong = true
    let twoIsWrong = true

    if(answer1.trim().length !==0) {
        oneIsWrong = false
    }

    if(answer2.trim().length !==0) {
        twoIsWrong = false
    }

    /**
     * Populates newQuestion object with answer 1 and 2's values
     */
    function populateQuestionMinimumAnswers() {
        newQuestion.option1 = answer1
        newQuestion.option2 = answer2
    }

    /**
     * Adds 'hidden' class to Error fields to hide errors
     *
     * @param answerError - placeholder for answer_Error query selector variable
     */
    function hideErrorsForAnswer(answerError) {
        answerError.classList.add('hidden')
    }

    /**
     * Removes 'hidden' class to Error fields to show errors
     *
     * @param answerError - placeholder for answer_Error query selector variable
     */
    function showErrorsForAnswer(answerError) {
        answerError.classList.remove('hidden')
    }

    /**
     * IF both answer1 and answer2 fields are filled in, populate newQuestion obj and hide both errors :D
     */
    function validAnswer1and2() {
        if(!oneIsWrong && !twoIsWrong) {
            hideErrorsForAnswer(answer1Error)
            hideErrorsForAnswer(answer2Error)
            populateQuestionMinimumAnswers()
        }
    }

    /**
     * IF answer1 field is blank but answer2 is filled in, will show error for answer1
     */
    function invalidAnswer1() {
        if(oneIsWrong && !twoIsWrong) {
            hideErrorsForAnswer(answer2Error)
            showErrorsForAnswer(answer1Error)
        }
    }

    /**
     * IF answer2 field is blank but answer1 is filled in, will show error for answer2
     */
    function invalidAnswer2() {
        if(!oneIsWrong && twoIsWrong) {
            hideErrorsForAnswer(answer1Error)
            showErrorsForAnswer(answer2Error)
        }
    }

    /**
     * IF answer1 and answer2 fields are blank will show both errors
     */
    function invalidAnswers() {
        if(oneIsWrong && twoIsWrong) {
            showErrorsForAnswer(answer1Error)
            showErrorsForAnswer(answer2Error)
        }
    }

    /**
     * Trims whitespace and checks answer exists,
     * Populates newQuestion object with answer value and assigned key
     *
     * @param answer - answer value (eg: answer4 query selector variable)
     * @param key - option value (eg: 'option4')
     */
    function validateOptionalField(answer, key) {
        if (answer.trim().length !==0) {
            newQuestion[key] = answer
        }
    }

    /**
     * Validates optional answers for answer field 3, 4 and 5
     */
    function validateOptionalAnswers() {
        validateOptionalField(answer3, 'option3')
        validateOptionalField(answer4, 'option4')
        validateOptionalField(answer5, 'option5')
    }

    /**
     * ForEach validation loop over radio buttons;
     * if one is checked - populates newQuestion object with answer reference value
     *
     * @returns {boolean} - if radio button checked = true
     * @returns {boolean} - if radio button is unchecked = false
     */
    function setCorrectAnswer() {
        correctAnswers.forEach( function(answer) {
            if (answer.checked) {
                newQuestion.answer = answer.value
            }
        })
        return newQuestion.answer;
    }

    /**
     * Removes error message if answer is correctly validated
     */
    function validateCorrectAnswer() {
        if (!setCorrectAnswer()) {
            correctAnswerError.classList.remove('hidden')
        } else {
            correctAnswerError.classList.add('hidden')
        }
    }
  
    validateQuestionText()
    validAnswer1and2()
    invalidAnswer1()
    invalidAnswer2()
    invalidAnswers()
    validateOptionalAnswers()
    validateCorrectAnswer()
    postQuestionsEdit(newQuestion)
})