/**
 * Sends the added or edited question to the API
 * @param event
 * @param form
 * @param isEdit is a true/false of whether the question is being edited. edited == true
 * @param questionId
 * @returns {Promise<void>}
 */
async function sendQuestionForm(event, form, isEdit, questionId) {
    event.preventDefault();

    const responseMsg = document.querySelector('#inputSubmissionConfirmation');
    const hasQuestions = formHasQuestion(form);
    const hasAnswers = formHasBetweenTwoAndFiveAnswers(form);
    const isValid = answerHasValidValue(form);

    if (hasQuestions && hasAnswers && isValid) {
        let answer;

        document.querySelectorAll('.answer-check').forEach((answerCheck, index) => {
            if (answerCheck.checked) {
                answer = index + 1;
            }
        });

        const data = {
            text: document.querySelector("#questionText").value,
            option1: document.querySelector("#option1").value,
            option2: document.querySelector("#option2").value,
            option3: document.querySelector("#option3").value,
            option4: document.querySelector("#option4").value,
            option5: document.querySelector("#option5").value,
            test_id: document.querySelector("#test_id").value,
            answer
        };
        let success;
        let message;

        if (isEdit) {
            const result = await editQuestion(questionId, data);
            success = result.success;
            message = result.message;
        } else {
            const result = await addQuestion(data);
            success = result.success;
            message = result.message;
        }
        ajaxResponseCheck(success, message, responseMsg, false);

    } else {
        responseMsg.classList.remove('alert-success');
        responseMsg.classList.add('alert-danger');
        responseMsg.textContent = 'Error: Please ensure you have filled out the question form correctly.';
    }
}