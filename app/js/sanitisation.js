function stringDisplaySanitiser(stringInput) {
    let txt = document.createElement('textarea')
    txt.innerHTML = stringInput
    return txt.value
}

function replaceSpecialChars(stringInput) {
    return stringInput
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function decodeSpecialChars(questionObj) {
    questionObj.text = stringDisplaySanitiser(questionObj.text)
    if (questionObj.hasOwnProperty('option1')) {
        questionObj.option1 = stringDisplaySanitiser(questionObj.option1)
    }
    if (questionObj.hasOwnProperty('option2')) {
        questionObj.option2 = stringDisplaySanitiser(questionObj.option2)
    }
    if (questionObj.hasOwnProperty('option3')) {
        questionObj.option3 = stringDisplaySanitiser(questionObj.option3)
    }
    if (questionObj.hasOwnProperty('option4')) {
        questionObj.option4 = stringDisplaySanitiser(questionObj.option4)
    }
    if (questionObj.hasOwnProperty('option5')) {
        questionObj.option5 = stringDisplaySanitiser(questionObj.option5)
    }
    return questionObj
}