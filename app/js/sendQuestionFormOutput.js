let authorised = false
let user = getCookie('userEmail')
getUser(user).then(function(user) {
    if ( user.data.isAdmin == '1' ) {
        authorised = true
    }
})

let newQuestionForm = document.getElementById("new-question")
let responseMsg = document.querySelector('#inputSubmissionConfirmation')
/**
 * When the user clicks the submit button, will get form value and prepare
 * it for the database.
 */
newQuestionForm.addEventListener('submit',  async function(e) {
    e.preventDefault()
    if (formHasQuestion(newQuestionForm) && formHasBetweenTwoAndFiveAnswers(newQuestionForm) && answerHasValidValue(newQuestionForm)) {
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
        questionData.text = newQuestionForm.question.value
        questionData.option1 = newQuestionForm.option1.value
        questionData.option2 = newQuestionForm.option2.value
        questionData.option3 = newQuestionForm.option3.value
        questionData.option4 = newQuestionForm.option4.value
        questionData.option5 = newQuestionForm.option5.value
        questionData.answer = answer
        questionData.test_id = newQuestionForm.test_id.value
        let questionDataToSend = await jsonToFormData(questionData);
        const questionPath = "question"
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
})

// populate dropdown menu with available tests
populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test')

