/**
 * Edit a question in the database
 * @param {number} id The question you want to edit
 * @param {object} newQuestionData The data you are changing
 * @returns {Promise<void>}
 */
async function editQuestion(id, newQuestionData) {
    return await sendData(jsonToFormData(newQuestionData), `/question/${id}/edit`);
}
