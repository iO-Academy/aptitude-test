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
}

document.querySelector(".next").addEventListener("click", next)
document.querySelector(".prev").addEventListener("click", prev)



/*
 * Fills the question navbar with clickable elements that takes you to the given question number.
 */
async function fillNav(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)
    fetch("http://localhost:8080/question")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            result.data.forEach(function(question) {
                let html = template(question)
                document.querySelector("#question-nav").innerHTML += html
            })
        })
}

getTemplateAjax('js/templates/navigation.hbs').then(function(HBTemplate) {
    fillNav(HBTemplate)
})