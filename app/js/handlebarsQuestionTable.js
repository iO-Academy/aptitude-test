let baseUrl = getBaseUrl()
let questionsTable = {data: []}

/**
 * Function which uses fetch request to populate questionAdmin.html with questions from questions API, using questionDisplay.hbs template
 */

function populateQuestionTable () {
    document.querySelector('.container').innerHTML = ""
    fetch(baseUrl + 'question')
        .then(data => data.json())
        .then(response => {
            response.data.forEach(function (question) {
                questionsTable.data[question.id] = question;
            })
            populateHandlebarsObject('.container', 'js/templates/questionDisplay.hbs', response).then(response => {
                let questionItems = document.querySelectorAll(".delete-question-button")
                addDeleteQEventListeners(questionItems)
            })
            addEditEventListeners()
            getQuestionCount()
        })
}


/**
 * Function that will trigger a modal with the question that you selected clicking on edit button
 */

function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn")
    editButtons.forEach(function(editButton) {
        console.log(editButton)
        editButton.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            openDialog()
            let handlebarsTempl = 'js/templates/editmodalquestions.hbs'
            populateHandlebarsObject('#modal', handlebarsTempl, questionsTable.data[e.target.id])
                .then(() => {
                    getData('answer/' + questionsTable.data[e.target.id].id)
                        .then(response => {
                            let questionAnswer = response.data.answer;
                            document.getElementById('ans' + questionAnswer).setAttribute('checked', true);
                            // populate dropdown menu with available tests
                            populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test')
                        })
                })
        })
    })
}

populateQuestionTable()