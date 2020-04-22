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

/**
 * Get a question from the database
 * @param {string} id The question you want to get
 * @returns {Promise<object>} the question data
 **/
async function getQuestionById(id) {
    const { data } = await getData("/question");
    return data.filter(question => question.id === String(id));
}

/**
 * Get the answer of a specific question
 * @param {string} id The question you would like the answer of
 * @returns {Promise<string>} the answer number
 */
async function getAnswerByQuestionId(id) {
    const { data } = await getData(`/answer/${id}`);
    return data.answer;
}

(async () => {
    const form = document.querySelector("#edit-question");
    const questionId = location.hash.replace("#", "");
    const [question] = await getQuestionById(questionId);
    const answer = await getAnswerByQuestionId(questionId);

    document.querySelector("#questionText").value = question.text;
    document.querySelector("#option1").value = question.option1;
    document.querySelector("#option2").value = question.option2;
    document.querySelector("#option3").value = question.option3;
    document.querySelector("#option4").value = question.option4;
    document.querySelector("#option5").value = question.option5;
    document.querySelector("#test_id").value = question.test_id;
    document.querySelector(`input[data-question-id="${answer}"]`).checked = 1;

    form.addEventListener("submit", async (event) => {
        await sendQuestionForm(event, form, true, questionId);
    });
})();



