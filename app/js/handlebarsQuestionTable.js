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
                addEditEventListeners()
            })

            getQuestionCount()
        })
}
populateQuestionTable()



/**
 * Function that will trigger a modal with the question that you selected clicking on edit button
 */

function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn")
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function (e) {
            e.stopImmediatePropagation()
            openDialog()
            let handlebarsTempl = 'js/templates/editmodalquestions.hbs'
            populateHandlebarsObject('#modal', handlebarsTempl, questionsTable.data[e.target.id])
                .then(() => {
                    let questionAnswer = null;
                    getData('answer/' + questionsTable.data[e.target.id].id)
                        .then(response => {
                            questionAnswer = response.data.answer;
                            document.getElementById('ans' + questionAnswer).setAttribute('checked', true);
                            // populate dropdown menu with available tests
                            populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test')
                        }).then(function () {
                        let response = {
                            text: null,
                            option1: null,
                            option2: null,
                            option3: null,
                            option4: null,
                            option5: null,
                            answer: questionAnswer,
                        }

                        let answersRadio = document.querySelectorAll(".answer-check")
                        answersRadio.forEach(function (radioButton) {
                            radioButton.addEventListener('click', function (e) {
                                radioButton.setAttribute('checked', true)
                                response.answer = radioButton.getAttribute('value')
                            })
                        })

                        document.getElementById('question-edit').addEventListener('submit', function (e) {
                            e.preventDefault()
                            response.text = document.getElementById("question-text").value
                            response.option1 = document.getElementById("option1").value
                            response.option2 = document.getElementById("option2").value
                            response.option3 = document.getElementById("option3").value
                            response.option4 = document.getElementById("option4").value
                            response.option5 = document.getElementById("option5").value
                            closeDialog()
                            console.log(response)
                            console.log(e.target.dataset.id)
                            postQuestionEdit(response, e.target.dataset.id).then((data) => {
                                console.log(data)
                                populateQuestionTable()
                            })

                        })
                    })


                })
        })
    })
}