let authorised = false;
let user = getCookie('userEmail');

getUser(user).then((user) => {
    if (user.data.isAdmin === '1') {
        authorised = true;
    }
});

// populate dropdown menu with available tests
populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test');

/**
 * Edit a question in the database
 * @param {string} id The question you want to edit
 * @param {object} newQuestionData The data you are changing
 * @returns {Promise<void>}
 */
async function editQuestion(id, newQuestionData) {
    return await sendData(jsonToFormData(newQuestionData), `/question/${id}/edit`);
}

async function getQuestionById(id) {
    const { data } = await getData("/question");
    return data.filter(question => question.id === String(id));
}

async function getAnswerByQuestionId(id) {
    const { data } = await getData(`/answer/${id}`);
    return data.answer;
}

// We are listening to the load event so that we can use async/await.
window.addEventListener("load", async () => {
    const form = document.querySelector("#edit-question");
    const questionId = location.hash.replace("#", "");
    const [question] = await getQuestionById(questionId);
    const answer = await getAnswerByQuestionId(questionId);

    document.querySelector("#question-to-edit").value = question.text;
    document.querySelector("#option1").value = question.option1;
    document.querySelector("#option2").value = question.option2;
    document.querySelector("#option3").value = question.option3;
    document.querySelector("#option4").value = question.option4;
    document.querySelector("#option5").value = question.option5;
    document.querySelector("#test_id").value = question.test_id;
    document.querySelector(`input[data-question-id="${answer}"]`).checked = 1;

    form.addEventListener("submit", async (event) => {
       event.preventDefault();

       const responseMsg = document.querySelector('#inputSubmissionConfirmation');
       const hasQuestions = formHasQuestion(form);
       const hasAnswers = formHasBetweenTwoAndFiveAnswers(form);
       const isValid = answerHasValidValue(form);

        if (hasQuestions && hasAnswers && isValid) {
            let answer;

            if (!authorised) {
                return;
            }

            document.querySelectorAll('.answer-check').forEach((answerCheck, index) => {
                if (answerCheck.checked) {
                    answer = index + 1;
                }
            });

            const { success, message } = await editQuestion(questionId,{
                text: document.querySelector("#question-to-edit").value,
                option1: document.querySelector("#option1").value,
                option2: document.querySelector("#option2").value,
                option3: document.querySelector("#option3").value,
                option4: document.querySelector("#option4").value,
                option5: document.querySelector("#option5").value,
                test_id: document.querySelector("#test_id").value,
                answer
            });

            responseMsg.textContent = message;

            if (success){
                responseMsg.classList.add('alert-success');
                responseMsg.classList.remove('alert-danger');
            } else {
                responseMsg.classList.remove('alert-success');
                responseMsg.classList.add('alert-danger');
            }
        } else {
            responseMsg.classList.remove('alert-success');
            responseMsg.classList.add('alert-danger');
            responseMsg.textContent = 'Error: Please ensure you have filled out the question form correctly.';
        }
    });
});


