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
                })

        })
    })
}

