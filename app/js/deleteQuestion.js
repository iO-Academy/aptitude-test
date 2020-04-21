/**
 * soft deletes question from database
 * @param {number} id the question id
 * @returns {Promise<*>} response from api
 */

async function deleteQuestion(id) {
    return await sendData(undefined, `/question/${id}/delete`);
}