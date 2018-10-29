var current = 1

/**
*adds active to the first question
* function in called when questions are inserted into html
 */
function active() {
    document.querySelector(".q_" + current).classList.add("active")
    document.querySelector("h4").textContent = current + "/30"
}

/**
*adds active class to next question, removes from current question
* makes the prev and next buttons appear when needed
 */
function next() {
    current++
    let nextQuestion = document.querySelector(".q_" + current)
    document.querySelector("h4").textContent = current + "/30"

    if (current !== 1) {
        document.querySelector(".prev").style.display = "block"
    }
    if (current === 30) {
        document.querySelector(".next").style.display = "none"
    }
    if (nextQuestion !== null) {
        document.querySelector(".active").classList.remove("active")
        document.querySelector(".q_" + current).classList.add("active")
    }
    updateFlagStatus()

}

/**
*adds active class to prev question, removes from current question
* makes the prev and next buttons appear when needed
 */
function prev() {
    current--
    let prevQuestion = document.querySelector(".q_" + current)
    document.querySelector("h4").textContent = current + "/30"

    if (current === 1) {
        document.querySelector(".prev").style.display = "none"
        document.querySelector(".next").style.display = "block"
    }
    if (current !== 30) {
        document.querySelector(".next").style.display = "block"
    }
    if (prevQuestion !== null) {
        document.querySelector(".active").classList.remove("active")
        document.querySelector(".q_" + current).classList.add("active")
    }
    updateFlagStatus()
}

function updateFlagStatus() {
    let qid  = document.querySelector('#questions .question.active').dataset.questionid
    document.querySelector('#flag-checkbox').checked = flaggedQuestions[qid]

}

document.querySelector(".next").addEventListener("click", next)
document.querySelector(".prev").addEventListener("click", prev)