var current = 1;
document.querySelector(".prev").style.visibility = "hidden";

/**
 *adds active to the first question
 * function in called when questions are inserted into html
 */
function active() {
    document.querySelector(".q_" + current).classList.add("active");
    document.querySelector("h4").textContent = current + "/30";
}

/**
 *adds active class to next question, removes from current question
 * makes the prev and next buttons appear when needed
 */
function next() {
    current++;
    let nextQuestion = document.querySelector(".q_" + current);
    let overviewButton = document.querySelectorAll(".overview");
    document.querySelector("h4").textContent = current + "/30";

    if (current !== 1) {
        document.querySelector(".prev").style.visibility = "visible";
    }
    if (current === 30) {
        document.querySelector(".next").style.visibility = "hidden";
        if (overviewButton.length == 0) {
            document
                .querySelector(".overview_column")
                .insertAdjacentHTML(
                    "beforeEnd",
                    '<button type="button" class="btn btn-info overview">Overview</button>'
                );
        }
    }
    if (nextQuestion !== null) {
        document.querySelector(".active").classList.remove("active");
        document.querySelector(".q_" + current).classList.add("active");
    }
    updateFlagStatus();
}

/**
 *adds active class to prev question, removes from current question
 * makes the prev and next buttons appear when needed
 */
function prev() {
    current--;
    let prevQuestion = document.querySelector(".q_" + current);
    document.querySelector("h4").textContent = current + "/30";

    if (current === 1) {
        document.querySelector(".prev").style.visibility = "hidden";
        document.querySelector(".next").style.visibility = "visible";
    }
    if (current !== 30) {
        document.querySelector(".next").style.visibility = "visible";
    }
    if (prevQuestion !== null) {
        document.querySelector(".active").classList.remove("active");
        document.querySelector(".q_" + current).classList.add("active");
    }
    updateFlagStatus();
}

function updateFlagStatus() {
    let qid  = document.querySelector('#questions .question.active').dataset.questionid
    document.querySelector('#flag-checkbox').checked = flaggedQuestions[qid]

    //('#questions-nav') is a placeholder for the page's number on the navbar
    if(flaggedQuestions[qid]) {
        document.querySelector('#questions-nav').classList.add('glyphicon','glyphicon-flag')
    } else {
        document.querySelector('#questions-nav').classList.remove('glyphicon','glyphicon-flag')
    }
}


document.querySelector(".next").addEventListener("click", next)
document.querySelector(".prev").addEventListener("click", prev)

document.querySelector('#flag-checkbox').addEventListener('change', updateFlagStatus)
