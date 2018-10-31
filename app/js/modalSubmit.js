/**
 * this is an event listener on the submit button (listens for click), it sends the object values through our validation functions.
 * If email exists in db then submit is not allowed. If original email matches current or email does not exist is db then user data is updated.
 *
 */

function addEditModalSubmitEventListener() {
    document.getElementById('editSubmit').addEventListener('click', function() {
        let name = document.getElementById("firstName").value
        let email = document.getElementById("email").value
        let originalEmail = document.getElementById("originalEmail").value

        getExistingUsers().then(function (existingUsers) {
            if (isEmpty(name) &&
                isEmpty(email) &&
                nameValidation(name) &&
                isEmailValid(email)) {
                if(originalEmail == email || userExists(email, existingUsers) == false){
                    closeDialog()
                    postUserEdit(createObjectForDatabase('.editUserData'))
                    updateUserTable()
                }
            }
        })
    })
}