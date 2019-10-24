let questionEdited = {
    text: null,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    option5: null,
    answer: null,
    test_id: null
}
/**
 * Function which uses fetch request to populate questionAdmin.html with questions from questions API, using questionDisplay.hbs template
 */
function populateQuestionTable () {
    document.querySelector('.container').innerHTML = ""
    fetch(getBaseUrl() + 'question')
        .then(data => data.json())
        .then(response => {
            response.data.forEach(function (question) {
                let questionsTable = {data: []}
                questionsTable.data[question.id] = question;
            })
            populateHandlebarsObject('.container', 'js/templates/questionDisplay.hbs', response).then(response => {
                let questionItems = document.querySelectorAll(".delete-question-button")
                addDeleteQEventListeners(questionItems)
                addEditEventListeners()
                getQuestionCount()
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
            modalEditedQuestion(e)
        })
    })
}

/**
 * Populates the template with the question that are selected
 * @param e Is the data of the question that you clicked
 */
function modalEditedQuestion(e){
    populateHandlebarsObject('#modal', 'js/templates/editmodalquestions.hbs', questionsTable.data[e.target.id])
        .then(() => {
            let questionAnswer = null;
            getData('answer/' + questionsTable.data[e.target.id].id)
                .then(response => {
                    questionAnswer = response.data.answer;
                    //takes the id and concatenate with answer to target the question with the correct answer
                    document.getElementById('ans' + questionAnswer).setAttribute('checked', true);
                    // populate dropdown menu with available tests
                    populateHandlebars('#test_id_box', 'js/templates/testDropdown.hbs', 'test')
                }).then(function () {
                let answersRadio = document.querySelectorAll(".answer-check")
                //iterates to catch the question answer that is clicked
                answersRadio.forEach(function (radioButton) {
                    radioButton.addEventListener('click', function (e) {
                        radioButton.setAttribute('checked', true)
                        questionEdited.answer = radioButton.getAttribute('value')

                    })
                })
                if(questionEdited.answer === null) {
                    questionEdited.answer = questionAnswer
                }
                submitEditedQuestion()
            })
        })
}

/**
 *Takes all the value from the fields, they are stored in a empty object and sends it to the api to update the database with the new changes
 */
function submitEditedQuestion(){
    document.getElementById('question-edit').addEventListener('submit', function (e) {
        questionEdited.text = document.getElementById("question-text").value
        questionEdited.option1 = document.getElementById("option1").value
        questionEdited.option2 = document.getElementById("option2").value
        questionEdited.option3 = document.getElementById("option3").value
        questionEdited.option4 = document.getElementById("option4").value
        questionEdited.option5 = document.getElementById("option5").value
        if(document.getElementById("test_id").value != null){
            questionEdited.test_id = document.getElementById("test_id").value
        }
        closeDialog()
        postQuestionEdit(questionEdited, e.target.dataset.id)
    })
}

populateQuestionTable()