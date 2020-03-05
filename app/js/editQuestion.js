async function getEditData() {

    let params = new URLSearchParams(location.search);

    let selectedTest = params.get('selectedTestId');
    let selectedQuestion = params.get('selectedQuestionId');

    populateQuestionToEdit(selectedTest, selectedQuestion);

}


async function populateQuestionToEdit(selectedTest, selectedQuestion) {

    let questionObj;
    const questions = await getData(`question?test_id=${selectedTest}`);


    questions.data.forEach((question) => {
        if (question.id === selectedQuestion) {
            questionObj = decodeSpecialChars(question);
        }
    })

    document.getElementById('exampleFormControlTextarea1').value = questionObj.text;

    let answers = document.querySelectorAll('.answer')

    answers.forEach((answer) => {

        answer.value = questionObj[`${answer.id}`]

    })

    document.getElementById('new-question').dataset.questionDbId = questionObj.id;


    await populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test');

    document.getElementById('test_id').value = questionObj.test_id;

}

getEditData();