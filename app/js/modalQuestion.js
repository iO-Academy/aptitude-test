/**
 * Opens the modal dialog box.
 */
function openDialog() {
    document.querySelector('#modal').style.display = 'block'
    document.querySelector('.overlay').style.display = 'block'
}

/**
 * Closes the modal dialog box.
 */
function closeDialog() {
    document.querySelector('#modal').style.display = 'none'
    document.querySelector('.overlay').style.display = 'none'
}


/**
 * Creates the modal with editmodelquestions handlebars template.
 * Then calls function to fill modal fields with the question data.
 * Then adds the submit button's event listener.
 * @param questionInfo contains the question info which you can edit
 */

function createQuestionModal(questionInfo) {
    getTemplateAjax('js/templates/editmodalquestions.hbs').then(function (template) {
        var hbsTemplate = Handlebars.compile(template)
        var html = hbsTemplate(questionInfo)
        document.getElementById('modal').innerHTML += html
    })
        .then(() => {
            fetch(baseUrl + 'answer/' + questionInfo.id)
                .then(response => response.json())
                .then(response => {
                    let questionAnswer = response.data.answer;
                    document.getElementById('ans' + questionAnswer).setAttribute('checked', true);
                })

        })
}


