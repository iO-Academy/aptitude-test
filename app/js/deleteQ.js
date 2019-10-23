/**
 * Adds event listener to the delete Q buttons.
 */
function addDeleteQEventListeners(questionItems) {
    questionItems.forEach(function (questionItem) {
        questionItem.addEventListener('click', function (e) {
            e.preventDefault()
            let questionId = e.target.parentElement.getAttribute("dataId")
            deleteQuestion(questionId)
        })
    })
}
/**
 * Sends the API call to delete a question with the specified ID and repopulate question table
 *
 * @param questionId
 */
function deleteQuestion(questionId) {
    let baseUrl = getBaseUrl()
    let url = baseUrl + "question/" + questionId + "/delete"
    fetch(url, {"method": "post"})
        .then(function () {
            populateQuestionTable()
        })
}