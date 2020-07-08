let authorised = false
let user = getCookie('userEmail');
getUser(user).then(function(user: any) {
    if ( user.data.isAdmin == '1' ) {
        authorised = true
    }
});

let newQuestionForm = document.querySelector<HTMLFormElement>("#new-question");

/**
 * Adds new question to API
 * @param newQuestionData
 * @returns {Promise<*>}
 */
async function addQuestion(newQuestionData: Object) {
    return await sendData(jsonToFormData(newQuestionData), `/question`);
}

/**
 * When the user clicks the submit button, will get form value and prepare
 * it for the database.
 */
newQuestionForm.addEventListener('submit',function(e) {
    sendQuestionForm(e, newQuestionForm, false);
});

// populate dropdown menu with available tests
populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test');

