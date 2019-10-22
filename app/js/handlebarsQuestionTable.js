let baseUrl = getBaseUrl()

/**
 * Fetch request to populate questionAdmin.html with questions from questions API, using questionDisplay.hbs template
 */

fetch(baseUrl + 'question')
    .then(data => data.json())
    .then(data => {

        fetch('questionDisplay.hbs')
            .then(template => template.text())
            .then(template => {
                console.log(template)
                var hbsTemplate = Handlebars.compile(template)
                var html = hbsTemplate(data)
                document.querySelector('body').innerHTML += html
            })

    })

/**
 * Function that will trigger a modal with the question that you selected clicking on edit button
 */

function addEditEventListeners() {
    let editButtons = document.querySelectorAll(".modalBtn")
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function (e) {
            openDialog()
        })
    })
}

