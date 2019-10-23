let baseUrl = getBaseUrl()
let questionsTable = {data: []}

/**
 * Fetch request to populate questionAdmin.html with questions from questions API, using questionDisplay.hbs template
 */

fetch(baseUrl + 'question')
    .then(data => data.json())
    .then(response => {
        response.data.forEach(function (question) {
            questionsTable.data[question.id] = question;
        })
        fetch('js/templates/questionDisplay.hbs')
            .then(template => template.text())
            .then(template => {

                var hbsTemplate = Handlebars.compile(template)
                var html = hbsTemplate(response)
                document.querySelector('.container').innerHTML += html
                addEditEventListeners()

            })

    })

function drawTable() {
    document.querySelector('.container').innerHTML = ''
    fetch(baseUrl + 'question')
        .then(data => data.json())
        .then(response => {
            response.data.forEach(function (question) {
                questionsTable.data[question.id] = question;
            })
            fetch('js/templates/questionDisplay.hbs')
                .then(template => template.text())
                .then(template => {

                    var hbsTemplate = Handlebars.compile(template)
                    var html = hbsTemplate(response)
                    document.querySelector('.container').innerHTML += html
                    addEditEventListeners()

                })

        })
}

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
                    getData('answer/' + questionsTable.data[e.target.id].id)
                        .then(response => {
                            let questionAnswer = response.data.answer;
                            document.getElementById('ans' + questionAnswer).setAttribute('checked', true);
                        })

                    let response = {
                        text: null,
                        option1: null,
                        option2: null,
                        option3: null,
                        option4: null,
                        option5: null,
                        answer: null,
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
                        postQuestionEdit(response, e.target.dataset.id)
                        drawTable()

                    })
                })
        })
    })
}