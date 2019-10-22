document.querySelector('#addNewUserForm').addEventListener('submit', function(event) {
    event.preventDefault()
    var emailField = document.getElementById("email")
    var nameField = document.getElementById('name')
    var errorField = document.getElementById('error')
    var timeField = document.getElementById('time')

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

        if(emailIsValid && timeIsValid) {
            errorField.innerHTML = ''
            var setTime = timeField.value * 60
            saveNewUser({'name': nameField.value, 'email': emailField.value, 'time': setTime}).then(function(response) {
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