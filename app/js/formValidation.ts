function formHasQuestion(form: HTMLFormElement): boolean {
    return form.question.value.length !== 0;
}

function formHasBetweenTwoAndFiveAnswers(form: HTMLFormElement): boolean {
    const answers = form.querySelectorAll('.answer');
    let fieldsThatHaveValues = 0;

    answers.forEach((answer: HTMLInputElement) => {
        if (answer.value.length > 0) {
            fieldsThatHaveValues++;
        }
    });

    return fieldsThatHaveValues >= 2;
}

function answerHasValidValue(form: HTMLFormElement): boolean {
    let result = false;

    form.querySelectorAll('.answer-check').forEach((checkbox: HTMLInputElement) => {
        const isOptionNotEmpty = typeof (checkbox.previousElementSibling as HTMLInputElement).value != 'undefined';
        const optionHasLength = (checkbox.previousElementSibling as HTMLInputElement).value.length > 0;
        const isChecked = checkbox.checked === true;

        if (isOptionNotEmpty && optionHasLength && isChecked) {
            result = true;
        }
    });

    return result;
}
