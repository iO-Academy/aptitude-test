//listen for click on delete button 

/**
 * Adds event listener to the delete Q buttons.
 */
function addDeleteQEventListeners() {
    let questionItems = document.querySelectorAll(".delete-question-button ")
    questionItems.forEach(function (questionItem) {
        questionItem.addEventListener('click', function (e) {
            let questionId = e.target.parentElement.getAttribute("dataId")
            deleteQuestion(questionId)
        })
    })
}
//delete the question
/**
 * Sends the API call to delete a question with the specified ID
 *
 * @param questionId
 */
function deleteQuestion(questionId) {
    let baseUrl = getBaseUrl()
    let url = baseUrl + "question/delete/" + userId
    fetch(url, {"method": "post"})
        .then(function () {
            updateScoreTable()
        })
}

//need to repopulate with updated list of questions