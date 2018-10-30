document.querySelector("#finish").addEventListener("click", function() {
    let overviewData = []
    let numOfQuestions = document.querySelectorAll('#questions .question').length
    for (let i = 1; i <= numOfQuestions; i++) {
        let questionObject = {}
        questionObject['id'] = i
        questionObject['isFlagged'] = Object.values(flaggedQuestions)[i]
        questionObject['isAnswered'] = getUserAnswers()[i]
        questionObject['question'] = document.querySelectorAll(`.q_${i} p`)[1].innerText.substring(0, 20) + '...'
        overviewData.push(questionObject)
    }
})