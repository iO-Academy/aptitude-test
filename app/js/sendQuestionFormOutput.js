let submit = document.getElementsByClassName("submit");
let form = document.querySelector("form");
let formData = new FormData(form);

/**
 * Convert addQuestion form data into JSON
 *
 * @return newQuestionJson
 */
let newQuestion = {}
formData.forEach((value, key) => {newQuestion[key] = value})
const newQuestionJson = JSON.stringify(newQuestion)