/**
 * Populate drop down options in 'add new user' and 'manage questions' sections
 */

function populateDropDowns(){
    populateHandlebars('#test_id', 'js/templates/testDropdown.hbs', 'test')
    populateHandlebars('#selectTest', 'js/templates/testDropdown.hbs', 'test')
    populateHandlebars('#selectQuestion', 'js/templates/questionDropdown.hbs', 'question')
    populateHandlebars('#selectTestDelete', 'js/templates/testDropdown.hbs', 'test')
    populateHandlebars('#selectQuestionDelete', 'js/templates/questionDropdown.hbs', 'question')
}

//populate drop downs on page load
populateDropDowns()

/**
 * Save the JSON object using an AJAX request.
 *
 * @param user The JSON object including name and email keys.
 *
 * @returns A promise containing the response, which includes the boolean success property.
 */
async function saveNewUser(user) {
    let baseUrl = getBaseUrl()
    let formData = jsonToFormData(user) // API does not work with JSON - needs form data
    let apiData = await fetch(
        baseUrl + 'user',
        {
            method: 'post',
            body: formData
        }
    )

    apiData = await apiData.json()
    return apiData
}

/**
 * Performs an AJAX request to retrieve existing users that are not deleted.
 *
 * @return  An array of user data.
 */
async function getExistingUsers() {
    let baseUrl = getBaseUrl()
    let result = []
    let apiData = await fetch(
        baseUrl +  'user',
        {method: 'get'}
    )
    apiData = await apiData.json()
    if (apiData.success) {
        let users = apiData.data
        users.forEach(function(user) {
            if (user.deleted == 0) {
                result.push(user)
            }
        })
    }

    return result
}

/**
 * Validates email using regex code.
 * The event that's fired off.
 *
 * @param email - The email address we want to check for.
 *
 * @returns {boolean} - Is the email valid.
 */
function isEmailValid(email) {
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (regexEmail.test(email)) {
        return true
    } else {
        return false
    }
}

/**
 * Returns true if email to add is identical to an existing user.
 *
 * @param emailToAdd  - The email address we want to check for.
 * @param existingUsers - The array of existing users data.
 *
 * @returns {boolean} - Does the user already exist.
 */
function userExists(emailToAdd, existingUsers) {
    var result = false
    existingUsers.forEach(function(user) {
        if (user.email === emailToAdd) {
            result = true
        }
    })

    return result
}

//Within manage question section, an event listener on the test dropdown which populates the EDIT question dropdown, when selected
document.getElementById('selectTest').addEventListener('change', function () {
    let selectorTestId = this.value
    populateHandlebars('#selectQuestion', 'js/templates/questionDropdown.hbs', `question?test_id=${selectorTestId}`)
})

//Within manage question section, an event listener on the test dropdown which populates the DELETE question dropdown, when selected
document.getElementById('selectTestDelete').addEventListener('change', function () {
    let selectorTestId = this.value
    populateHandlebars('#selectQuestionDelete', 'js/templates/questionDropdown.hbs', `question?test_id=${selectorTestId}`)
})

document.querySelector('#addNewUserForm').addEventListener('submit', function(event) {
    event.preventDefault()
    let emailField = document.querySelector('#email')
    let nameField = document.querySelector('#name')
    let testField = document.querySelector('#test_id')
    let errorField = document.querySelector('#error')
    let timeField = document.querySelector('#time')

    getExistingUsers().then(function(existingUsers) {

        let emailIsValid = true
        let timeIsValid = true

        if (!isEmailValid(emailField.value) || userExists(emailField.value, existingUsers)) {
            emailIsValid = false
            errorField.innerHTML = "Your email is not valid or already exists: Please provide a correct email"
        }
        if (timeField.value <=1 || timeField.value == null || isNaN(timeField.value) === true ) {
            timeIsValid = false
            errorField.innerHTML += 'This is not a good number!'
        }

        if (emailIsValid && timeIsValid) {
            errorField.innerHTML = ''
            var setTime = timeField.value * 60
            saveNewUser({'name': nameField.value, 'email': emailField.value, 'test_id': testField.value, 'time': setTime}).then(function(response) {
                if (response.success) {
                    nameField.value = ''
                    emailField.value = ''
                    timeField.value = 30
                    updateScoreTable()
                } else {
                    errorField.innerHTML = response.message
                }
            })
        }
    })
})