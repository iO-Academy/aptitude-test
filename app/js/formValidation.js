function formHasQuestion(form) {
    return form.question.value.length !== 0;
}

function formHasBetweenTwoAndFiveAnswers(form) {
    const answers = form.querySelectorAll('.answer');
    let fieldsThatHaveValues = 0;

    answers.forEach((answer) => {
        if (answer.value.length > 0) {
            fieldsThatHaveValues++
        }
    });

    return fieldsThatHaveValues >= 2;
}

function answerHasValidValue(form) {
    let result = false;

    form.querySelectorAll('.answer-check').forEach((checkbox) => {
        const isOptionNotEmpty = typeof checkbox.previousElementSibling.value != 'undefined';
        const optionHasLength = checkbox.previousElementSibling.value.length > 0;
        const isChecked = checkbox.checked === true;

        if (isOptionNotEmpty && optionHasLength && isChecked) {
            result = true
        }
    });

    return result;
}
